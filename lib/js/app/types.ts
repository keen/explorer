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

export type SavedQueryAPIResponse = {
  query_name: string;
  refresh_rate: number;
  user_last_modified_date: string;
  created_date: string;
  last_modified_date: string;
  query: Record<string, any>;
  metadata: {
    display_name?: string;
    tags?: string[];
    widget?: string;
  };
};

export type Metadata = {
  displayName?: string;
};
