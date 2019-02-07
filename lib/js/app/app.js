import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import KeenAnalysis from 'keen-analysis';

import '../../../test/demo/keen-explorer.css';

import rootReducer from './redux';
import rootSaga from './redux/sagas';
import client from './redux/client';

import { version } from '../../../package.json';

import Persistence from './modules/persistence/persistence.js';
import AppComponent from './components/app.js';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
));

sagaMiddleware.run(rootSaga);

export class KeenExplorer {
  constructor(props){
    const { keenAnalysis, keenDataviz } = props;
    this.keenAnalysis = keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);

    ReactDOM.render(
      <Provider store={store}>
        <AppComponent
          {...props}
        />
      </Provider>,
      document.querySelector(props.container));
  }
}

KeenExplorer.version = version;
KeenExplorer.Persistence = Persistence;

// only for DEV mode
export let keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}

export default KeenExplorer;
