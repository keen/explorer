import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import createSagaMiddleware from 'redux-saga';
import { createMemoryHistory } from 'history';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
import KeenAnalysis from 'keen-analysis';

import { ToastProvider } from '@keen.io/toast-notifications';
import { getPubSub, PubSub } from '@keen.io/pubsub';
import { screenBreakpoints } from '@keen.io/ui-core';
import { extendTheme } from '@keen.io/charts';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createI18n from './i18n';

import App from './components/App';
import { AppContext } from './contexts';

import { NotificationManager } from './modules/notifications';
import { appStart } from './modules/app';

import { Options } from './types';

import {
  SHOW_TOAST_NOTIFICATION_EVENT,
  PUBSUB_CONTEXT,
  CONFIRM_EXTRACTION_LIMIT,
  NOTIFICATION_MANAGER_CONTEXT,
  DEFAULT_EXTRACTION_CONFIRMATION_LIMIT,
  DEFAULT_TIMEZONE_FOR_QUERY,
  KEEN_CLIENT_CONTEXT,
  DASHBOARDS_API_CONTEXT,
  INITIAL_VIEWS,
} from './constants';

import { createViewUpdateMiddleware } from './middleware';

export class KeenExplorer {
  constructor(props: Options) {
    const {
      keenAnalysis,
      upgradeSubscriptionUrl,
      modalContainer,
      dataviz,
      translations: translationSettings,
      defaultTimezoneForQuery,
      disableTimezoneSelection,
      confirmExtractionLimit,
      dashboardsApiUrl,
      createDashboardUrl,
      onViewChange,
      savedQuery,
    } = props;
    const keenAnalysisClient =
      keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);

    const notificationPubSub = new PubSub();
    createI18n(translationSettings);

    const initialView = props.initialView || 'browser';

    let initialViewUrl = INITIAL_VIEWS[initialView];
    if (savedQuery) {
      initialViewUrl += '?savedQuery=' + savedQuery;
    }

    console.log('initialViewUrl', initialViewUrl);
    const history = createMemoryHistory({
      initialIndex: 0,
      initialEntries: [initialViewUrl],
    });

    const sagaMiddleware = createSagaMiddleware({
      context: {
        [KEEN_CLIENT_CONTEXT]: keenAnalysisClient,
        [CONFIRM_EXTRACTION_LIMIT]:
          confirmExtractionLimit || DEFAULT_EXTRACTION_CONFIRMATION_LIMIT,
        [PUBSUB_CONTEXT]: getPubSub(),
        [NOTIFICATION_MANAGER_CONTEXT]: new NotificationManager({
          pubsub: notificationPubSub,
          eventName: SHOW_TOAST_NOTIFICATION_EVENT,
        }),
        [DASHBOARDS_API_CONTEXT]: dashboardsApiUrl,
      },
    });

    const composeEnhancers = composeWithDevTools({});

    const reduxMiddlewares = [sagaMiddleware, routerMiddleware(history)];

    if (onViewChange) {
      reduxMiddlewares.push(createViewUpdateMiddleware(onViewChange));
    }

    const store = createStore(
      combineReducers({
        ...rootReducer,
        router: connectRouter(history),
      }),
      composeEnhancers(applyMiddleware(...reduxMiddlewares))
    );

    sagaMiddleware.run(rootSaga);

    store.dispatch(appStart(initialView, savedQuery));

    const datavizSettings = {
      theme: extendTheme(dataviz?.theme),
    };

    ReactDOM.render(
      <Provider store={store}>
        <ThemeProvider
          theme={{
            breakpoints: screenBreakpoints,
          }}
        >
          <ConnectedRouter history={history}>
            <AppContext.Provider
              value={{
                keenAnalysis: keenAnalysisClient,
                modalContainer,
                upgradeSubscriptionUrl,
                notificationPubSub,
                datavizSettings: datavizSettings,
                defaultTimezoneForQuery:
                  defaultTimezoneForQuery || DEFAULT_TIMEZONE_FOR_QUERY,
                disableTimezoneSelection,
                enableDashboardsConnection: !!dashboardsApiUrl,
                createDashboardUrl,
              }}
            >
              <ToastProvider>
                <App />
              </ToastProvider>
            </AppContext.Provider>
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>,
      document.querySelector(props.container)
    );
  }
}

export default KeenExplorer;
