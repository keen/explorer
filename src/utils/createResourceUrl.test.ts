/* eslint-disable @typescript-eslint/camelcase */
import { createResourceUrl } from './createResourceUrl';

test('stringify query params', () => {
  const query = {
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
  const config = {
    protocol: 'http',
    host: 'host',
    projectId: 'projectId',
    masterKey: 'masterKey',
  };

  expect(createResourceUrl({ query, config })).toMatchSnapshot();
});
