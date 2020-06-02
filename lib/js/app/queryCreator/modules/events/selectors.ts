import { AppState } from '../../types';

export const getEventsCollections = (state: AppState) =>
  state.events.collections;

export const getCollectionSchema = (state: AppState, collection: string) =>
  state.events.schemas[collection];
