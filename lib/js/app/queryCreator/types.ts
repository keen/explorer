import { ReducerState as QueryReducerState } from './modules/query';
import { ReducerState as EventsReducerState } from './modules/events';

import { Analysis } from '../types';

export type AppState = {
  query: QueryReducerState;
  events: EventsReducerState;
};

export type CreatorFields =
  | 'analysis'
  | 'eventCollection'
  | 'targetProperty'
  | 'percentile'
  | 'timeframe';

type FieldRule = ('*' | Analysis)[];

export type QueryCreatorConfig = Record<CreatorFields, FieldRule>;
