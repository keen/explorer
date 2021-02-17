/* eslint-disable @typescript-eslint/camelcase */
import composeQuerySettings from './composeQuerySettings';

test('should return query settings for funnel analysis', () => {
  const querySettings = {
    analysis_type: 'funnel',
    timezone: null,
    timeframe: null,
    steps: [
      {
        with_actors: false,
        actor_property: 'user.id',
        filters: [],
        timeframe: 'this_14_days',
        timezone: null,
        event_collection: 'purchases',
        optional: false,
        inverted: false,
      },
      {
        with_actors: false,
        actor_property: 'user.age',
        filters: [],
        timeframe: 'this_14_days',
        timezone: null,
        event_collection: 'signups',
        optional: false,
        inverted: false,
      },
      {
        with_actors: false,
        actor_property: 'platform',
        filters: [],
        timeframe: 'this_14_days',
        timezone: null,
        event_collection: 'signups',
        optional: false,
        inverted: false,
      },
    ],
  };

  expect(composeQuerySettings(querySettings)).toMatchInlineSnapshot(`
    Object {
      "analysis_type": "funnel",
      "event_collection": undefined,
      "filters": undefined,
      "steps": Array [
        Object {
          "actor_property": "user.id",
          "event_collection": "purchases",
          "filters": Array [],
          "inverted": false,
          "optional": false,
          "timeframe": "this_14_days",
          "timezone": null,
          "with_actors": false,
        },
        Object {
          "actor_property": "user.age",
          "event_collection": "signups",
          "filters": Array [],
          "inverted": false,
          "optional": false,
          "timeframe": "this_14_days",
          "timezone": null,
          "with_actors": false,
        },
        Object {
          "actor_property": "platform",
          "event_collection": "signups",
          "filters": Array [],
          "inverted": false,
          "optional": false,
          "timeframe": "this_14_days",
          "timezone": null,
          "with_actors": false,
        },
      ],
      "timeframe": undefined,
      "timezone": undefined,
    }
  `);
});

test('should return query settings for count analysis', () => {
  const querySettings = {
    filters: [],
    analysis_type: 'count',
    timezone: 'UTC',
    timeframe: 'this_14_days',
    zero_fill: null,
    order_by: null,
    interval: null,
    group_by: null,
    limit: null,
    event_collection: 'purchases',
  };

  expect(composeQuerySettings(querySettings)).toMatchInlineSnapshot(`
    Object {
      "analysis_type": "count",
      "event_collection": "purchases",
      "filters": Array [],
      "group_by": null,
      "interval": null,
      "limit": null,
      "order_by": null,
      "timeframe": "this_14_days",
      "timezone": "UTC",
      "zero_fill": null,
    }
  `);
});

test('should return query settings for query without timezone', () => {
  const querySettings = {
    filters: [],
    analysis_type: 'count',
    timezone: null,
    timeframe: 'this_14_days',
    zero_fill: null,
    order_by: null,
    interval: null,
    group_by: null,
    limit: null,
    event_collection: 'purchases',
  };

  expect(composeQuerySettings(querySettings)).toMatchInlineSnapshot(`
    Object {
      "analysis_type": "count",
      "event_collection": "purchases",
      "filters": Array [],
      "group_by": null,
      "interval": null,
      "limit": null,
      "order_by": null,
      "timeframe": "this_14_days",
      "timezone": "UTC",
      "zero_fill": null,
    }
  `);
});
