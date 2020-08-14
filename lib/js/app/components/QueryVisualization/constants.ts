import { Widget } from './types';

export const DEFAULT_VISUALIZATIONS = ['json'];

export const DEFAULT_FILENAME = 'untitled-query';

export const Widgets: {
  [name: string]: Widget;
} = {
  bar: 'bar',
  line: 'line',
  area: 'area',
  pie: 'pie',
  donut: 'donut',
  gauge: 'gauge',
  metric: 'metric',
  funnel: 'funnel',
  choropleth: 'choropleth',
  bubble: 'bubble',
  heatmap: 'heatmap',
  table: 'table',
};
