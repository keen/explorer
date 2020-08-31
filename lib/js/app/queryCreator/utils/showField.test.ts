import { showField } from './showField';

test('should show analysisType for all types of analysis', () => {
  const fieldCount = showField('analysisType', 'count');
  const fieldSum = showField('analysisType', 'sum');
  const fieldAverage = showField('analysisType', 'average');

  expect(fieldCount).toBeTruthy();
  expect(fieldSum).toBeTruthy();
  expect(fieldAverage).toBeTruthy();
});

test('should show percentile field only for percentile type of analysis', () => {
  const fieldCount = showField('percentile', 'count');
  const fieldSum = showField('percentile', 'sum');
  const fieldAverage = showField('percentile', 'percentile');

  expect(fieldCount).toBeFalsy();
  expect(fieldSum).toBeFalsy();
  expect(fieldAverage).toBeTruthy();
});

test('should show only supported fields for extraction', () => {
  const analysisType = showField('analysisType', 'extraction');
  const eventCollection = showField('eventCollection', 'extraction');
  const targetProperty = showField('targetProperty', 'extraction');
  const email = showField('email', 'extraction');
  const contentEncoding = showField('contentEncoding', 'extraction');
  const propertyNames = showField('propertyNames', 'extraction');
  const latest = showField('latest', 'extraction');

  expect(analysisType).toBeTruthy();
  expect(eventCollection).toBeTruthy();
  expect(targetProperty).toBeFalsy();
  expect(email).toBeTruthy();
  expect(contentEncoding).toBeTruthy();
  expect(propertyNames).toBeTruthy();
  expect(latest).toBeTruthy();
});
