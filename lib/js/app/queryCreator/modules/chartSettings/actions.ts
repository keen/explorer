import { UPDATE_CHART_SETTINGS, RESET_CHART_SETTINGS } from './constants';

import { ChartSettingsActions, ReducerState } from './types';

export const updateChartSettings = (
  settings: Partial<ReducerState>
): ChartSettingsActions => ({
  type: UPDATE_CHART_SETTINGS,
  payload: settings,
});

export const resetChartSettings = (): ChartSettingsActions => ({
  type: RESET_CHART_SETTINGS,
});
