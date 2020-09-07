import { eventsReducer, initialState } from './reducer';
import {
  setCollectionSchemaLoading,
  setEventsCollections,
  fetchCollectionSchema,
  fetchCollectionSchemaSuccess,
  fetchCollectionSchemaError,
  computeSchemaSuccess,
} from './actions';
import {
  getEventsCollections,
  getCollectionSchema,
  getSchemaLoading,
  getSchemas,
} from './selectors';
import {
  FETCH_COLLECTION_SCHEMA,
  FETCH_COLLECTION_SCHEMA_SUCCESS,
  SCHEMA_COMPUTED,
} from './constants';
import { ReducerState, FetchCollectionSchemaAction } from './types';

export {
  initialState,
  eventsReducer,
  fetchCollectionSchema,
  fetchCollectionSchemaSuccess,
  fetchCollectionSchemaError,
  setEventsCollections,
  setCollectionSchemaLoading,
  getEventsCollections,
  getCollectionSchema,
  getSchemas,
  getSchemaLoading,
  computeSchemaSuccess,
  ReducerState,
  FetchCollectionSchemaAction,
};
export {
  FETCH_COLLECTION_SCHEMA,
  FETCH_COLLECTION_SCHEMA_SUCCESS,
  SCHEMA_COMPUTED,
};
