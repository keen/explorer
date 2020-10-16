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

  const queryParamsWithFilters = {
    steps: [
      {
        event_collection: 'purchases',
        actor_property: 'item.price',
        timeframe: 'this_14_days',
        filters: [],
        inverted: false,
        optional: false,
        with_actors: false,
      },
      {
        event_collection: 'signups',
        actor_property: 'user.age',
        timeframe: 'this_14_days',
        filters: [
          {
            operator: 'ne',
            property_type: 'String',
            property_value: 'male',
            property_name: 'user.gender',
          },
        ],
        inverted: false,
        optional: false,
        with_actors: false,
      },
    ],
  };

  expect(stringify(queryParams)).toMatchSnapshot();
  expect(stringify(queryParamsWithFilters)).toMatchSnapshot();
});
