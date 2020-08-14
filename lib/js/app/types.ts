import { Filter, OrderBy, Timeframe, Timezones } from './queryCreator/types';

export type Analysis =
  | 'sum'
  | 'average'
  | 'count'
  | 'count_unique'
  | 'maximum'
  | 'minimum'
  | 'median'
  | 'percentile'
  | 'standard_deviation'
  | 'funnel'
  | 'extraction'
  | 'select_unique';

export type APIError = {
  error_code: string;
  body: string;
  status: number;
};

export type Metadata = {
  displayName?: string;
};

export type SavedQuery = {
  refreshRate: number;
  userLastModifiedDate: string;
  lastModifiedDate: string;
  queryName: string;
  metadata?: Metadata;
  query: {
    analysisType: Analysis;
    eventCollection: string;
  };
};

export type Query = {
  analysisType: Analysis;
  eventCollection: string;
  targetProperty?: string;
  filters?: Filter[];
  groupBy?: string[];
  interval?: string;
  limit?: number;
  orderBy?: OrderBy;
  timeframe: Timeframe;
  timezone?: Timezones;
  percentile?: number;
};
