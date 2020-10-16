import { UPDATE_CHART_SETTINGS, RESET_CHART_SETTINGS } from './constants';

export type ChartSettings = {
  stepLabels: string[];
};

export type ReducerState = ChartSettings;

export interface UpdateChartSettingsAction {
  type: typeof UPDATE_CHART_SETTINGS;
  payload: Partial<ChartSettings>;
}

export interface ResetChartSettingsAction {
  type: typeof RESET_CHART_SETTINGS;
}

export type ChartSettingsActions =
  | UpdateChartSettingsAction
  | ResetChartSettingsAction;
