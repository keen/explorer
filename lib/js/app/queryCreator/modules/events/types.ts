import {
  SET_EVENTS_COLLECTIONS,
  FETCH_COLLECTION_SCHEMA,
  FETCH_COLLECTION_SCHEMA_ERROR,
  FETCH_COLLECTION_SCHEMA_SUCCESS,
  SET_COLLETION_SCHEMA_LOADING,
  SCHEMA_COMPUTED,
} from './constants';

export type CollectionSchema = {
  schema: Record<string, string>;
  list: { path: string; type: string }[];
  tree: Record<string, string[] | Record<string, any>>;
};

export type ReducerState = {
  collections: string[];
  loadingSchemas: string[];
  schemas: Record<string, CollectionSchema>;
};

export interface SchemaComputedAction {
  type: typeof SCHEMA_COMPUTED;
  payload: {
    collection: string;
    schema: Partial<CollectionSchema>;
  };
}

export interface SetCollectionSchemaLoadingAction {
  type: typeof SET_COLLETION_SCHEMA_LOADING;
  payload: {
    colletion: string;
    isLoading: boolean;
  };
}

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
    schema: Record<string, string>;
  };
}

export interface FetchCollectionSchemaErrorAction {
  type: typeof FETCH_COLLECTION_SCHEMA_ERROR;
  payload: {
    error: Error;
  };
}

export type EventsActions =
  | SetCollectionSchemaLoadingAction
  | SetEventsCollectionsAction
  | FetchCollectionSchemaAction
  | FetchCollectionSchemaSuccessAction
  | FetchCollectionSchemaErrorAction
  | SchemaComputedAction;
