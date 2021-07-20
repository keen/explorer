import { mergeChartSettings } from './mergeChartSettings';
import { BarChartSettings, Theme } from '@keen.io/charts';

test('Merges bar chart settings', () => {
  const chartType = 'bar';
  const chartSettings = {
    theme: {
      gridX: {
        enabled: true,
      },
      gridY: {
        enabled: false,
      },
    },
  } as BarChartSettings;

  const theme = {
    colors: ['red', 'green'],
  } as Theme;

  expect(
    mergeChartSettings({ chartType, chartSettings, baseTheme: theme })
  ).toStrictEqual({
    theme: {
      colors: ['red', 'green'],
      gridX: {
        enabled: true,
      },
      gridY: {
        enabled: false,
      },
    },
  });
});
