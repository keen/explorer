import { Widget } from '../types';
import { Widgets } from '../constants';
import { Query } from '../../../types';

export const getAvailableWidgets = (query: Query): Widget[] => {
  if (query) {
    if (query.analysisType === 'extraction') {
      return [Widgets.table];
    }

    if (query.analysisType === Widgets.funnel) {
      return [
        Widgets.bar,
        Widgets.area,
        Widgets.line,
        Widgets.funnel,
        Widgets.table,
      ];
    }

    if (query.groupBy && !query.interval) {
      return [
        Widgets.bar,
        Widgets.line,
        Widgets.area,
        Widgets.pie,
        Widgets.donut,
        Widgets.heatmap,
        Widgets.choropleth,
        Widgets.table,
      ];
    }

    if (query.interval) {
      return [
        Widgets.bar,
        Widgets.line,
        Widgets.area,
        Widgets.heatmap,
        Widgets.table,
      ];
    }

    return [Widgets.gauge, Widgets.metric, Widgets.table];
  }
};
