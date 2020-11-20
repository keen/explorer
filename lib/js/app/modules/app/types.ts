import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

export type Confirmation = 'delete';

export type ViewMode = 'browser' | 'editor';

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
};
