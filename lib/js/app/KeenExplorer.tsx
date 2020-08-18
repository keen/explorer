// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { ToastProvider } from '@keen.io/toast-notifications';
import { getPubSub, PubSub } from '@keen.io/pubsub';

import KeenAnalysis from 'keen-analysis';

import '../../../test/demo/keen-explorer.css';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import { version } from '../../../package.json';

import App from './components/App';
import { AppContext } from './contexts';

import { NotificationManager } from './modules/notifications';

import { SHOW_TOAST_NOTIFICATION_EVENT } from './constants';

export class KeenExplorer {
  constructor(props) {
    const { keenAnalysis } = props;
    const keenAnalysisClient =
      keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);

    const notificationPubSub = new PubSub();
    const sagaMiddleware = createSagaMiddleware({
      context: {
        keenClient: keenAnalysisClient,
        pubsub: getPubSub(),
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

    ReactDOM.render(
      <Provider store={store}>
        <AppContext.Provider
          value={{
            keenAnalysis: keenAnalysisClient,
            modalContainer: props.modalContainer,
            upgradeSubscriptionUrl: props.upgradeSubscriptionUrl,
            notificationPubSub,
          }}
        >
          <ToastProvider>
            <App {...props} />
          </ToastProvider>
        </AppContext.Provider>
      </Provider>,
      document.querySelector(props.container)
    );
  }
}

KeenExplorer.version = version;

export default KeenExplorer;
