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
import { rehydrateState } from './rehydrateState';
import { AppContext } from './contexts';

import { appStart } from './modules/app';
import { getQuery, serializeQuery, resetQuery } from './modules/query';
import { transformToQuery, transformQueryToCamelCase } from './utils';

import { UPDATE_TIMEOUT, SET_QUERY_EVENT, NEW_QUERY_EVENT } from './constants';

declare global {
  interface Window {
    __QUERY_CREATOR_SCHEMAS__: Record<string, any>;
  }
}

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

class QueryCreator extends React.PureComponent<Props> {
  /** Query Creator store */
  store: Store;

  pubsub: PubSub;

  /** Event loop update query tick */
  updateQueryTrigger: NodeJS.Timeout;

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

    const preloadedState = rehydrateState();
    this.store = createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(sagaMiddleware)
    );

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
      if (onUpdateQuery) {
        if (this.updateQueryTrigger) clearTimeout(this.updateQueryTrigger);
        this.updateQueryTrigger = setTimeout(() => {
          onUpdateQuery(transformToQuery(query));
        }, UPDATE_TIMEOUT);
      }
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
            const transformedQuery = transformQueryToCamelCase(query);
            this.store.dispatch(serializeQuery(transformedQuery));
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
