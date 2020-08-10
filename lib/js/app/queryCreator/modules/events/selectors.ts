import { AppState } from '../../types';

export const getEventsCollections = (state: AppState) =>
  state.events.collections;

export const getSchemas = (state: AppState) => state.events.schemas;

export const getSchemaLoading = (state: AppState, colletion: string) =>
  state.events.loadingSchemas.includes(colletion);

export const getCollectionSchema = (state: AppState, collection: string) => {
  const schema = state.events.schemas[collection];
  return (
    schema || {
      schema: {},
      list: [],
      tree: {},
    }
  );
};
