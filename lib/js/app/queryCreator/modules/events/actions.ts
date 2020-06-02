import {
  SET_EVENTS_COLLECTIONS,
  FETCH_COLLECTION_SCHEMA,
  FETCH_COLLECTION_SCHEMA_ERROR,
  FETCH_COLLECTION_SCHEMA_SUCCESS,
} from './constants';

import { EventsActions, CollectionSchema } from './types';

export const setEventsCollections = (collections: string[]): EventsActions => ({
  type: SET_EVENTS_COLLECTIONS,
  payload: { collections },
});

export const fetchCollectionSchema = (collection: string): EventsActions => ({
  type: FETCH_COLLECTION_SCHEMA,
  payload: { collection },
});

export const fetchCollectionSchemaSuccess = (
  collection: string,
  schema: CollectionSchema
): EventsActions => ({
  type: FETCH_COLLECTION_SCHEMA_SUCCESS,
  payload: { collection, schema },
});

export const fetchCollectionSchemaError = (error: Error): EventsActions => ({
  type: FETCH_COLLECTION_SCHEMA_ERROR,
  payload: { error },
});
