import { showField } from './showField';
import { ANALYSIS_TYPES } from '../constants';

test('should show analysisType for all types of analysis', () => {
  ANALYSIS_TYPES.forEach((type) => {
    expect(showField('analysisType', type)).toBeTruthy();
  });
});

test.each([
  [showField('percentile', 'count'), 'count', false],
  [showField('percentile', 'sum'), 'sum', false],
  [showField('percentile', 'percentile'), 'percentile', true],
])('showField for percentile field returns %s for %s', (a, _b, expected) => {
  expect(a).toBe(expected);
});

test.each([
  [showField('analysisType', 'extraction'), 'analysisType', true],
  [showField('eventCollection', 'extraction'), 'eventCollection', true],
  [showField('targetProperty', 'extraction'), 'targetProperty', false],
  [showField('email', 'extraction'), 'email', true],
  [showField('contentEncoding', 'extraction'), 'contentEncoding', true],
  [showField('propertyNames', 'extraction'), 'propertyNames', true],
  [showField('latest', 'extraction'), 'latest', true],
])('showField for extraction analysis returns %s for %s', (a, _b, expected) => {
  expect(a).toBe(expected);
});
