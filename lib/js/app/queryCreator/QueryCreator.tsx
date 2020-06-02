import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import KeenAnalysis from 'keen-analysis';

import App from './App';
import rootSaga from './saga';
import rootReducer from './reducer';

import { appStart } from './modules/app';

type Props = {
  /** Keen project identifer */
  projectId: string;
  /** Keen read access key */
  readKey: string;
  /** Keen master access key */
  masterKey: string;
};

class QueryCreator extends React.Component<Props> {
  /** Query Creator store */
  store: Store;

  constructor(props: Props) {
    super(props);

    const keenClient = new KeenAnalysis({
      projectId: this.props.projectId,
      masterKey: this.props.masterKey,
      readKey: this.props.readKey,
    });

    const sagaMiddleware = createSagaMiddleware({
      context: {
        keenClient,
      },
    });
    this.store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga);
    this.store.dispatch(appStart());
  }

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}

export default QueryCreator;
