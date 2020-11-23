import camelCase from 'camelcase-keys';
import { WIDGETS } from '@keen.io/widget-picker';

import getDefaultVisualization from './getDefaultVisualization';

import { VisualizationMeta } from '../../../types';

const WIDGET_MAPPINGS: Record<string, string> = {
  metric: 'metric',
  bar: 'bar',
  'horizontal-bar': 'bar',
  pie: 'pie',
  donut: 'donut',
  table: 'table',
  line: 'line',
  spline: 'line',
  area: 'area',
  funnel: 'funnel',
  'funnel-3d': 'funnel',
  'horizontal-funnel': 'funnel',
  'horizontal-funnel-3d': 'funnel',
};

/**
 * Serializes visualization for saved query.
 *
 * @param query - query settings
 * @param visualization - visualization settings metadata
 * @return visualization settings
 *
 */
const serializeVisualization = (
  query: Record<string, any>,
  visualization?: VisualizationMeta
) => {
  if (visualization) {
    if (
      visualization.chart_type &&
      !('chart_settings' in visualization) &&
      !('widget_settings' in visualization)
    ) {
      const widget = WIDGET_MAPPINGS[visualization.chart_type];
      const settings = WIDGETS.find(({ id }) => id === widget);

      if (settings) {
        const {
          defaultChartSettings,
          defaultWidgetSettings,
          widget,
        } = settings;

        return {
          type: widget,
          chartSettings: defaultChartSettings,
          widgetSettings: defaultWidgetSettings,
        };
      }

      return getDefaultVisualization(query);
    } else if (
      visualization.type &&
      'chart_settings' in visualization &&
      'widget_settings' in visualization
    ) {
      return {
        type: visualization.type,
        chartSettings: camelCase(visualization.chart_settings, {
          deep: true,
        }),
        widgetSettings: camelCase(visualization.widget_settings, {
          deep: true,
        }),
      };
    }
  }

  return getDefaultVisualization(query);
};

export default serializeVisualization;
