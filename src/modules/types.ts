import { ReducerState as SavedQueryReducerState } from './savedQuery';
import { ReducerState as QueriesReducerState } from './queries';
import { ReducerState as AppReducerState } from './app';
import { ReducerState as ProjectReducerState } from './project';

export type AppState = {
  app: AppReducerState;
  savedQuery: SavedQueryReducerState;
  queries: QueriesReducerState;
  project: ProjectReducerState;
};
