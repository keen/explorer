import { PickerWidgets } from '@keen.io/widget-picker';
import { Theme } from '@keen.io/charts';

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

export type VisualizationMeta = {
  type: PickerWidgets;
  chart_settings?: Record<string, any>;
  widget_settings?: Record<string, any>;
  chart_type?: string;
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
    visualization?: VisualizationMeta;
    step_labels?: string[];
  };
};

export type ProjectSettings = {
  projectId: string;
  masterKey: string;
  readKey: string;
  writeKey: string;
};

export type DatavizSettings = {
  theme?: Theme;
};

export type TranslationsSettings = {
  backend?: {
    loadPath?: string;
  };
};

export type Options = {
  container: string;
  modalContainer: string;
  initialView: 'browser' | 'editor';
  upgradeSubscriptionUrl?: string;
  dataviz?: DatavizSettings;
  translations?: TranslationsSettings;
  keenAnalysis: {
    config: ProjectSettings;
    instance: any;
  };
  defaultTimezoneForQuery?: string;
  disableTimezoneSelection?: boolean;
};
