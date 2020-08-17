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
