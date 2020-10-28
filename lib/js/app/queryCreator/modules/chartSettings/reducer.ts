import { ReducerState, ChartSettingsActions } from './types';

import { UPDATE_CHART_SETTINGS, RESET_CHART_SETTINGS } from './constants';

export const initialState: ReducerState = {
  stepLabels: [],
};

export const chartSettingsReducer = (
  state: ReducerState = initialState,
  action: ChartSettingsActions
) => {
  switch (action.type) {
    case UPDATE_CHART_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_CHART_SETTINGS:
      return initialState;
    default:
      return state;
  }
};
