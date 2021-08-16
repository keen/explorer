import { PickerWidgets, WidgetSettings } from '@keen.io/widget-picker';
import { SortMode } from '@keen.io/ui-core';
import { ChartSettings } from '../../types';

export type Confirmation = 'delete';

export type ViewMode = 'browser' | 'editor';

export type QueriesFilters = {
  showOnlyCachedQueries: boolean;
  tags: string[];
};

export type SortProperty = 'displayName' | 'lastModifiedDate';

export type QueriesSortSettings = {
  direction: SortMode;
  property: SortProperty;
};

export enum SettingsModalSource {
  QUERY_SETTINGS,
  FIRST_QUERY_SAVE,
}

export type ReducerState = {
  confirmModal: {
    action: Confirmation;
    visible: boolean;
    meta?: Record<string, any>;
  };
  extractToEmailModal: {
    visible: boolean;
  };
  querySettingsModal: {
    visible: boolean;
    source: SettingsModalSource;
  };
  embedModal: {
    visible: boolean;
  };
  view: ViewMode;
  browserScreen: {
    width: number;
    height: number;
  };
  visualization: {
    type: PickerWidgets | null;
    chartSettings: ChartSettings;
    widgetSettings: WidgetSettings;
  };
  autorunQuery: boolean;
  queriesFilters: QueriesFilters;
  queriesSortSettings: QueriesSortSettings;
};
