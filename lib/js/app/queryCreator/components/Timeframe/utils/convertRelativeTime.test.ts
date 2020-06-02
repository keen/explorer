import { convertRelativeTime } from './convertRelativeTime';

test('converts "today" short-hand time convenience', () => {
  expect(convertRelativeTime('today')).toEqual({
    relativity: 'this',
    value: 1,
    units: 'days',
  });
});

test('converts "yesterday" short-hand time convenience', () => {
  expect(convertRelativeTime('yesterday')).toEqual({
    relativity: 'previous',
    value: 1,
    units: 'days',
  });
});

test('converts "previous_minute" short-hand time convenience', () => {
  expect(convertRelativeTime('previous_minute')).toEqual({
    relativity: 'previous',
    value: 1,
    units: 'minutes',
  });
});

test('converts "previous_hour" short-hand time convenience', () => {
  expect(convertRelativeTime('previous_hour')).toEqual({
    relativity: 'previous',
    value: 1,
    units: 'hours',
  });
});

test('converts "previous_day" short-hand time convenience', () => {
  expect(convertRelativeTime('previous_day')).toEqual({
    relativity: 'previous',
    value: 1,
    units: 'days',
  });
});

test('converts "previous_week" short-hand time convenience', () => {
  expect(convertRelativeTime('previous_week')).toEqual({
    relativity: 'previous',
    value: 1,
    units: 'weeks',
  });
});

test('converts "previous_month" short-hand time convenience', () => {
  expect(convertRelativeTime('previous_month')).toEqual({
    relativity: 'previous',
    value: 1,
    units: 'months',
  });
});

test('converts "previous_year" short-hand time convenience', () => {
  expect(convertRelativeTime('previous_year')).toEqual({
    relativity: 'previous',
    value: 1,
    units: 'years',
  });
});

test('converts "this_30_days" time convenience', () => {
  expect(convertRelativeTime('this_30_days')).toEqual({
    relativity: 'this',
    value: 30,
    units: 'days',
  });
});

test('converts "previous_2_years" time convenience', () => {
  expect(convertRelativeTime('previous_2_years')).toEqual({
    relativity: 'previous',
    value: 2,
    units: 'years',
  });
});
