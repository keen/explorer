import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import createSagaMiddleware from 'redux-saga';
import { ToastProvider } from '@keen.io/toast-notifications';
import { getPubSub, PubSub } from '@keen.io/pubsub';
import { screenBreakpoints } from '@keen.io/ui-core';
import { extendTheme } from '@keen.io/charts';

import KeenAnalysis from 'keen-analysis';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createI18n from './i18n';

import App from './components/App';
import { AppContext } from './contexts';

import { NotificationManager } from './modules/notifications';
import { appActions } from './modules/app';

import { Options } from './types';

import {
  SHOW_TOAST_NOTIFICATION_EVENT,
  PUBSUB_CONTEXT,
  CONFIRM_EXTRACTION_LIMIT,
  NOTIFICATION_MANAGER_CONTEXT,
  DEFAULT_EXTRACTION_CONFIRMATION_LIMIT,
  DEFAULT_TIMEZONE_FOR_QUERY,
} from './constants';

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
    } = props;
    const keenAnalysisClient =
      keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);

    const notificationPubSub = new PubSub();
    createI18n(translationSettings);

    const sagaMiddleware = createSagaMiddleware({
      context: {
        keenClient: keenAnalysisClient,
        [CONFIRM_EXTRACTION_LIMIT]:
          confirmExtractionLimit || DEFAULT_EXTRACTION_CONFIRMATION_LIMIT,
        [PUBSUB_CONTEXT]: getPubSub(),
        [NOTIFICATION_MANAGER_CONTEXT]: new NotificationManager({
          pubsub: notificationPubSub,
          eventName: SHOW_TOAST_NOTIFICATION_EVENT,
        }),
      },
    });
    const composeEnhancers = composeWithDevTools({});
    const store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga);

    const initialView = props.initialView || 'browser';
    store.dispatch(appActions.appStart({ initialView }));

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
            }}
          >
            <ToastProvider>
              <App />
            </ToastProvider>
          </AppContext.Provider>
        </ThemeProvider>
      </Provider>,
      document.querySelector(props.container)
    );
  }
}

export default KeenExplorer;
