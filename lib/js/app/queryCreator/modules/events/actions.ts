import {
  SET_EVENTS_COLLECTIONS,
  SET_COLLETION_SCHEMA_LOADING,
  FETCH_COLLECTION_SCHEMA,
  FETCH_COLLECTION_SCHEMA_ERROR,
  FETCH_COLLECTION_SCHEMA_SUCCESS,
  SCHEMA_COMPUTED,
} from './constants';

import { EventsActions, CollectionSchema } from './types';

export const setEventsCollections = (collections: string[]): EventsActions => ({
  type: SET_EVENTS_COLLECTIONS,
  payload: { collections },
});

export const computeSchemaSuccess = (
  collection: string,
  schema: Partial<CollectionSchema>
): EventsActions => ({
  type: SCHEMA_COMPUTED,
  payload: {
    collection,
    schema,
  },
});

export const setCollectionSchemaLoading = (
  colletion: string,
  isLoading: boolean
): EventsActions => ({
  type: SET_COLLETION_SCHEMA_LOADING,
  payload: { colletion, isLoading },
});

export const fetchCollectionSchema = (collection: string): EventsActions => ({
  type: FETCH_COLLECTION_SCHEMA,
  payload: { collection },
});

export const fetchCollectionSchemaSuccess = (
  collection: string,
  schema: Record<string, string>
): EventsActions => ({
  type: FETCH_COLLECTION_SCHEMA_SUCCESS,
  payload: { collection, schema },
});

export const fetchCollectionSchemaError = (error: Error): EventsActions => ({
  type: FETCH_COLLECTION_SCHEMA_ERROR,
  payload: { error },
});
