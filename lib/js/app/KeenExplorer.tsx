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
import KeenTracking from 'keen-tracking';

import '../../../test/demo/keen-explorer.css';

import rootReducer from './redux';
import rootSaga from './redux/sagas';

import { version } from '../../../package.json';

import App from './components/App';
import { AppContext } from './contexts';

import { NotificationManager } from './modules/notifications';

import { SHOW_TOAST_NOTIFICATION_EVENT } from './constants';

export let client;
export let keenTrackingClient;

export class KeenExplorer {
  constructor(props) {
    const { keenAnalysis, keenTracking } = props;

    client = keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);

    if (keenTracking) {
      keenTrackingClient =
        keenTracking.instance || new KeenTracking(keenTracking.config);
    }

    const notificationPubSub = new PubSub();
    const sagaMiddleware = createSagaMiddleware({
      context: {
        keenClient: client,
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
            keenAnalysis: client,
            modalContainer: props.modalContainer,
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
