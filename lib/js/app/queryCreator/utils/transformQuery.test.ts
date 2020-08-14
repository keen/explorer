/* eslint-disable @typescript-eslint/camelcase */
import { transformQuery } from './transformQuery';

test('should return transformed query', () => {
  const query = {
    analysis_type: 'count',
    event_collection: 'Clicks',
    target_property: 'anchor',
    filters: [],
    group_by: ['tabs'],
    interval: 'weekly',
    limit: 100,
    order_by: {
      propertyName: 'time',
      direction: 'ASC',
    },
    timeframe: 'this_14_days',
    timezone: 'UTC',
    percentile: 50,
  };

  const result = transformQuery(query);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "analysisType": "count",
      "eventCollection": "Clicks",
      "filters": Array [],
      "groupBy": Array [
        "tabs",
      ],
      "interval": "weekly",
      "limit": 100,
      "orderBy": Object {
        "direction": "ASC",
        "propertyName": "time",
      },
      "percentile": 50,
      "targetProperty": "anchor",
      "timeframe": "this_14_days",
      "timezone": "UTC",
    }
  `);
});
