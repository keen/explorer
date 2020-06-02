import {
  SET_EVENTS_COLLECTIONS,
  FETCH_COLLECTION_SCHEMA,
  FETCH_COLLECTION_SCHEMA_ERROR,
  FETCH_COLLECTION_SCHEMA_SUCCESS,
} from './constants';

export type CollectionSchema = Record<string, string>;

export type ReducerState = {
  collections: string[];
  schemas: Record<string, CollectionSchema>;
};

export interface SetEventsCollectionsAction {
  type: typeof SET_EVENTS_COLLECTIONS;
  payload: {
    collections: string[];
  };
}

export interface FetchCollectionSchemaAction {
  type: typeof FETCH_COLLECTION_SCHEMA;
  payload: {
    collection: string;
  };
}

export interface FetchCollectionSchemaSuccessAction {
  type: typeof FETCH_COLLECTION_SCHEMA_SUCCESS;
  payload: {
    collection: string;
    schema: CollectionSchema;
  };
}

export interface FetchCollectionSchemaErrorAction {
  type: typeof FETCH_COLLECTION_SCHEMA_ERROR;
  payload: {
    error: Error;
  };
}

export type EventsActions =
  | SetEventsCollectionsAction
  | FetchCollectionSchemaAction
  | FetchCollectionSchemaSuccessAction
  | FetchCollectionSchemaErrorAction;
