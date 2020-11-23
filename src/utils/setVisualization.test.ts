/* eslint-disable @typescript-eslint/camelcase */
import { setVisualization } from './setVisualization';

test('returns current settings for visualization', () => {
  const query = {};
  const settings: any = {
    type: 'bar',
    chartSettings: {
      groupMode: 'stacked',
    },
    widgetSettings: {},
  };

  expect(setVisualization(query, settings)).toEqual(settings);
});

test('return default visualization settings based on query', () => {
  const query = {
    analysis_type: 'count',
  };
  const settings: any = {
    type: null,
  };

  expect(setVisualization(query, settings)).toMatchInlineSnapshot(`
    Object {
      "chartSettings": Object {},
      "type": "metric",
      "widgetSettings": Object {},
    }
  `);
});
