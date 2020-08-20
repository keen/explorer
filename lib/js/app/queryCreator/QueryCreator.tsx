import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store, Unsubscribe } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { ThemeProvider } from 'styled-components';
import { getPubSub, PubSub } from '@keen.io/pubsub';
import KeenAnalysis from 'keen-analysis';

import App from './App';
import rootSaga from './saga';
import rootReducer from './reducer';
import theme from './theme';
import { AppContext } from './contexts';

import { appStart } from './modules/app';
import { getQuery, setQuery, resetQuery } from './modules/query';
import { transformToQuery } from './utils/transformToQuery';
import { serializeQuery } from './utils/serializeQuery';

import { SET_QUERY_EVENT, NEW_QUERY_EVENT } from './constants';

type Props = {
  /** Keen project identifer */
  projectId: string;
  /** Keen read access key */
  readKey: string;
  /** Keen master access key */
  masterKey: string;
  /** Host name */
  host?: string;
  /** Modal container selector */
  modalContainer: string;
  /** Update query event handler */
  onUpdateQuery?: (query: Record<string, any>) => void;
};

class QueryCreator extends React.Component<Props> {
  /** Query Creator store */
  store: Store;

  pubsub: PubSub;

  setQuerySubscription: () => void;

  storeSubscription: Unsubscribe;

  constructor(props: Props) {
    super(props);

    const keenClient = new KeenAnalysis({
      projectId: this.props.projectId,
      masterKey: this.props.masterKey,
      readKey: this.props.readKey,
      host: this.props.host,
    });

    const sagaMiddleware = createSagaMiddleware({
      context: {
        keenClient,
      },
    });
    this.store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga);
    this.store.dispatch(appStart());

    this.pubsub = getPubSub();

    this.runQueryListener();
    this.subscribeSetQuery();
  }

  componentWillUnmount() {
    if (this.storeSubscription) this.storeSubscription();
    if (this.setQuerySubscription) this.setQuerySubscription();
  }

  runQueryListener = () => {
    const { onUpdateQuery } = this.props;
    this.storeSubscription = this.store.subscribe(() => {
      const state = this.store.getState();
      const query = getQuery(state);
      if (onUpdateQuery) onUpdateQuery(transformToQuery(query));
    });
  };

  subscribeSetQuery = () => {
    this.setQuerySubscription = this.pubsub.subscribe(
      (eventName: string, meta: any) => {
        switch (eventName) {
          case NEW_QUERY_EVENT:
            this.store.dispatch(resetQuery());
            break;
          case SET_QUERY_EVENT:
            const { query } = meta;
            const serializedQuery = serializeQuery(query);
            this.store.dispatch(setQuery(serializedQuery));
            break;
          default:
            break;
        }
      }
    );
  };

  render() {
    return (
      <Provider store={this.store}>
        <ThemeProvider theme={theme}>
          <AppContext.Provider
            value={{ modalContainer: this.props.modalContainer }}
          >
            <App />
          </AppContext.Provider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default QueryCreator;
