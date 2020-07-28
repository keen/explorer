// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { getPubSub } from '@keen.io/pubsub';
import KeenAnalysis from 'keen-analysis';
import KeenTracking from 'keen-tracking';

import '../../../test/demo/keen-explorer.css';

import rootReducer from './redux';
import rootSaga from './redux/sagas';

import { version } from '../../../package.json';

import App from './components/App';
import { AppContext } from './contexts';

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

    const sagaMiddleware = createSagaMiddleware({
      context: {
        keenClient: client,
        pubsub: getPubSub(),
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
          value={{ keenAnalysis: client, modalContainer: props.modalContainer }}
        >
          <App {...props} />
        </AppContext.Provider>
      </Provider>,
      document.querySelector(props.container)
    );
  }
}

KeenExplorer.version = version;

export default KeenExplorer;
