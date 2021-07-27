import deepMerge from 'deepmerge';
import { Theme } from '@keen.io/charts';
import { ChartSettings } from '../types';

/**
 * Merges chart theme settings with base theme settings or adds theme field when chart does not have it
 */
export const composeChartSettings = (
  chartSettings: ChartSettings,
  baseTheme: Partial<Theme>
) => {
  if ('theme' in chartSettings) {
    return {
      ...chartSettings,
      theme: deepMerge(baseTheme, chartSettings.theme, {
        arrayMerge: (_target, source) => source,
      }),
    };
  }
  return {
    ...chartSettings,
    theme: baseTheme,
  };
};
