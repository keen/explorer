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
  | 'timeframe'
  | 'timezone'
  | 'groupBy'
  | 'steps';

type FieldRule = ('*' | Analysis)[];

export type QueryCreatorConfig = Record<CreatorFields, FieldRule>;

export type Timeframe =
  | string
  | {
      start: string;
      end: string;
    };

export type FunnelStep = {
  actorProperty: string;
  eventCollection: string;
  inverted: boolean;
  optional: boolean;
  timeframe: Timeframe;
  timezone?: Timezones | number;
  withActors: boolean;
  filters: any[];
};

export type Timezones =
  | 'US/Eastern'
  | 'US/Central'
  | 'US/Mountain'
  | 'US/Pacific'
  | 'US/Alaska'
  | 'US/Hawaii'
  | 'Europe/Amsterdam'
  | 'Europe/London'
  | 'Europe/Paris'
  | 'Europe/Prague'
  | 'Europe/Stockholm'
  | 'Europe/Copenhagen'
  | 'Africa/Casablanca'
  | 'Africa/Nairobi'
  | 'Asia/Singapore'
  | 'Australia/Sydney'
  | 'Asia/Dubai'
  | 'Asia/Istanbul'
  | 'Asia/Jakarta'
  | 'Asia/Tokyo'
  | 'America/Sao_Paulo'
  | 'Australia/Perth'
  | 'Europe/Istanbul'
  | 'Pacific/Auckland'
  | 'UTC';
