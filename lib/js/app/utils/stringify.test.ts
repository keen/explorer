/* eslint-disable @typescript-eslint/camelcase */
import { stringify } from './stringify';

test('stringify query params', () => {
  const queryParams = {
    filters: [],
    timezone: 'UTC',
    timeframe: 'this_14_weeks',
    zero_fill: null,
    order_by: [
      { direction: 'ASC', property_name: 'result' },
      { direction: 'ASC', property_name: 'platform' },
    ],
    interval: null,
    group_by: ['referrer', 'platform'],
    limit: null,
    event_collection: 'purchases',
  };

  expect(stringify(queryParams)).toMatchSnapshot();
});
