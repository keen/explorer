import { ReducerState as SavedQueryReducerState } from './savedQuery';
import { ReducerState as QueriesReducerState } from './queries';
import { ReducerState as AppReducerState } from './app';
import { ReducerState as ProjectReducerState } from './project';
import { ReducerState as SchemasReducerState } from './schemas';

export type AppState = {
  app: AppReducerState;
  savedQuery: SavedQueryReducerState;
  queries: QueriesReducerState;
  schemas: SchemasReducerState;
  project: ProjectReducerState;
};
