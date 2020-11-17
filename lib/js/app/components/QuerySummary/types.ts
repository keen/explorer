import { Timeframe, Timezones } from '@keen.io/query-creator';

export type Filter = {
  operator: string;
  property_name: string;
  property_value: string;
  property_type?: string;
};

export type FunnelStep = {
  actor_property: string;
  event_collection: string;
  inverted: boolean;
  optional: boolean;
  timeframe: Timeframe;
  timezone?: Timezones | number;
  with_actors: boolean;
  filters: Filter[];
};
