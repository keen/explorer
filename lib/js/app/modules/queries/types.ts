import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

import { APIError } from '../../types';

export type Visualization = {
  type: PickerWidgets;
  chartSettings: ChartSettings;
  widgetSettings: WidgetSettings;
};

export type SavedQueryListItem = {
  name: string;
  displayName: string;
  refreshRate: number;
  lastModifiedDate: string;
  cached: boolean;
  query: Record<string, any>;
  tags: string[];
  visualization: Visualization;
};

export type ReducerState = {
  results: any;
  settings: Record<string, any>;
  isQueryPerforming: boolean;
  isSavedQueriesLoaded: boolean;
  isSavingQuery: boolean;
  savedQueries: SavedQueryListItem[];
  cachedQueries: {
    limit: null | number;
    limitReached: boolean;
  };
  queriesExecution: {
    limitReached: boolean;
  };
  saveQueryError: APIError | null;
  error: APIError | null;
};
