import { ReducerState as SavedQueryReducerState } from './savedQuery';
import { ReducerState as QueryCreatorState } from './queryCreator';
import { ReducerState as QueriesReducerState } from './queries';
import { ReducerState as AppReducerState } from './app';

export type AppState = {
  app: AppReducerState;
  savedQuery: SavedQueryReducerState;
  queryCreator: QueryCreatorState;
  queries: QueriesReducerState;
};
