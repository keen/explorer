/* eslint-disable @typescript-eslint/camelcase */
import serializeVisualization from './serializeVisualization';
import getDefaultVisualization from './getDefaultVisualization';

jest.mock('./getDefaultVisualization');

(getDefaultVisualization as any).mockImplementation(() => ({
  type: 'metric',
}));

beforeEach(() => {
  (getDefaultVisualization as any).mockClear();
});

test('creates default visualization settings based on query', () => {
  const query = { analysis_type: 'count' };
  serializeVisualization(query, null);

  expect(getDefaultVisualization).toHaveBeenCalled();
});

test('create mapping for "Explorer v6" visualizations', () => {
  const settings: any = { chart_type: 'horizontal-funnel-3d' };
  const result = serializeVisualization({}, settings);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "chartSettings": Object {
        "layout": "vertical",
      },
      "type": "funnel",
      "widgetSettings": Object {},
    }
  `);
});

test('fallbacks to default visualization for unknown "Explorer v6" chart', () => {
  const settings: any = { chart_type: 'unknown-chart' };
  serializeVisualization({}, settings);

  expect(getDefaultVisualization).toHaveBeenCalled();
});

test('serializes visualization settings', () => {
  const settings: any = {
    type: 'line',
    chart_settings: { area_mode: true },
    widget_settings: {},
  };
  const result = serializeVisualization({}, settings);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "chartSettings": Object {
        "areaMode": true,
      },
      "type": "line",
      "widgetSettings": Object {},
    }
  `);
});
