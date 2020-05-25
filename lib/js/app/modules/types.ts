import { ReducerState as SavedQueryReducerState } from './savedQuery';
import { ReducerState as QueriesReducerState } from './queries';

export type AppState = {
  savedQuery: SavedQueryReducerState;
  queries: QueriesReducerState;
};
