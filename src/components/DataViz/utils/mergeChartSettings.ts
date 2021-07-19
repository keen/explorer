import { Widgets } from '@keen.io/widgets';
import { Theme } from '@keen.io/charts';
import { ChartSettings } from '../../../types';

type Params = {
  chartType: Widgets;
  chartSettings: ChartSettings;
  baseTheme: Theme;
};

export const mergeChartSettings = ({
  chartType,
  chartSettings,
  baseTheme,
}: Params) => {
  if (chartType === 'bar') {
    const settings = {
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
    return settings;
  }
  return {
    ...chartSettings,
    ...baseTheme,
  };
};
