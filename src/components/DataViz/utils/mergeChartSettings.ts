import { Theme } from '@keen.io/charts';
import { PickerWidgets } from '@keen.io/widget-picker';

import { ChartSettings } from '../../../types';

type Params = {
  chartType: PickerWidgets;
  chartSettings: ChartSettings;
  baseTheme: Theme;
};

/**
 * Function that allows to fallback fields missing in chart settings from theme
 */
export const mergeChartSettings = ({
  chartType,
  chartSettings,
  baseTheme,
}: Params) => {
  if (chartType === 'bar') {
    return {
      theme: {
        ...baseTheme,
        ...chartSettings.theme,
        gridX: {
          ...baseTheme.gridX,
          ...chartSettings.theme.gridX,
        },
        gridY: {
          ...baseTheme.gridY,
          ...chartSettings.theme.gridY,
        },
      },
    };
  }
  return {
    ...chartSettings,
    ...baseTheme,
  };
};
