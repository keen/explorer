import { inheritFromPreviousStep } from './inheritFromPreviousStep';

import { DEFAULT_FUNNEL_STEP } from '../constants';

import { FunnelStep } from '../../../types';

test('returns timeframe and timezone settings from latest step', () => {
  const steps = [
    {
      ...DEFAULT_FUNNEL_STEP,
      timeframe: 'previous_16_days',
      timezone: 'US/Hawaii',
    },
  ];

  const settings = inheritFromPreviousStep(steps as FunnelStep[]);

  expect(settings).toMatchInlineSnapshot(`
    Object {
      "timeframe": "previous_16_days",
      "timezone": "US/Hawaii",
    }
  `);
});

test('returns empty settings for empty funnel steps collection', () => {
  const settings = inheritFromPreviousStep([]);

  expect(settings).toMatchInlineSnapshot(`Object {}`);
});
