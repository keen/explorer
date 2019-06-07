import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import KeenAnalysis from 'keen-analysis';

import '../../../test/demo/keen-explorer.css';

import rootReducer from './redux';
import rootSaga from './redux/sagas';

import { version } from '../../../package.json';

import AppComponent from './components/app';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
));

sagaMiddleware.run(rootSaga);

const defaultConfig = {
  previewCollection: true,
  saveStateToLocalStorage: {
    eventCollection: true,
  },
};

export let client;

export class KeenExplorer {
  constructor(props) {
    const { keenAnalysis } = props;

    client = keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);

    ReactDOM.render(
      <Provider store={store}>
        <AppComponent
          {...{
            ...defaultConfig,
            ...props,
          }}
        />
      </Provider>,
      document.querySelector(props.container),
    );
  }
}

KeenExplorer.version = version;

export default KeenExplorer;
