import { getTimezoneValue } from './getTimezoneValue';

test('reflects value for named timezone', () => {
  const timezone = 'Europe/London';

  expect(getTimezoneValue(timezone)).toEqual(timezone);
});

test('returns named timezone for "number" value', () => {
  const timezone = -18000;

  expect(getTimezoneValue(timezone)).toEqual('US/Eastern');
});

test('returns default value for named timezone that is not mapped', () => {
  const timezone = 100;

  expect(getTimezoneValue(timezone)).toMatchInlineSnapshot(`"UTC"`);
});
