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

import KeenAnalysis from 'keen-analysis';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createI18n from './i18n';

import App from './components/App';
import { AppContext } from './contexts';

import { NotificationManager } from './modules/notifications';
import { appStart } from './modules/app';

import { Options } from './types';

import { SHOW_TOAST_NOTIFICATION_EVENT, PUBSUB_CONTEXT } from './constants';

export class KeenExplorer {
  constructor(props: Options) {
    const {
      keenAnalysis,
      upgradeSubscriptionUrl,
      modalContainer,
      dataviz,
      translations: translationSettings,
    } = props;
    const keenAnalysisClient =
      keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);

    const notificationPubSub = new PubSub();
    createI18n(translationSettings);

    const sagaMiddleware = createSagaMiddleware({
      context: {
        keenClient: keenAnalysisClient,
        [PUBSUB_CONTEXT]: getPubSub(),
        notificationManager: new NotificationManager({
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
    store.dispatch(appStart(initialView));

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
              datavizSettings: dataviz,
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
