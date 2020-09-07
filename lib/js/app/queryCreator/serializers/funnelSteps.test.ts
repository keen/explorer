import { serializeFunnelSteps } from './funnelSteps';

import { DEFAULT_FUNNEL_STEP } from '../modules/query';

import { FunnelStep } from '../types';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 'id'),
  };
});

test('serializes funnel steps', () => {
  const steps: FunnelStep[] = [
    {
      ...DEFAULT_FUNNEL_STEP,
      eventCollection: 'purchases',
      actorProperty: 'user.id',
      filters: [
        {
          propertyName: 'keen.id',
          operator: 'eq',
          propertyValue: '10',
        },
      ],
    },
  ];

  const result = serializeFunnelSteps(steps);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "stepsFilters": Array [
        Object {
          "eventCollection": "purchases",
          "filters": Array [
            Object {
              "operator": "eq",
              "propertyName": "keen.id",
              "propertyValue": "10",
            },
          ],
          "id": "id",
        },
      ],
      "transformedSteps": Array [
        Object {
          "actorProperty": "user.id",
          "eventCollection": "purchases",
          "filters": Array [],
          "id": "id",
          "inverted": false,
          "optional": false,
          "timeframe": "this_14_days",
          "timezone": undefined,
          "withActors": false,
        },
      ],
    }
  `);
});
