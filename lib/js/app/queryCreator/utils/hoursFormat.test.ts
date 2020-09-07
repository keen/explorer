import { use12HoursDateFormat } from './hoursFormat';

test('should return truthy value for 12hr format', () => {
  const mockToLocaleTimeString = jest.fn(() => '4:00 PM');
  global.Date.prototype.toLocaleTimeString = mockToLocaleTimeString;

  expect(use12HoursDateFormat()).toBeTruthy();
});

test('should return falsy value for 24hr format', () => {
  const mockToLocaleTimeString = jest.fn(() => '14:00');
  global.Date.prototype.toLocaleTimeString = mockToLocaleTimeString;

  expect(use12HoursDateFormat()).toBeFalsy();
});
