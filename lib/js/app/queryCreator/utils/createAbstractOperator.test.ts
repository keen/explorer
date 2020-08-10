import { createAbstractOperator } from './createAbstractOperator';

import { Operator } from '../types';

test('creates "is_null" operator based on filter settings', () => {
  const filter = {
    propertyName: 'category',
    propertyValue: null,
    operator: 'eq' as Operator,
  };
  const operator = createAbstractOperator(filter);

  expect(operator).toEqual('is_null');
});

test('creates "is_not_null" operator based on filter settings', () => {
  const filter = {
    propertyName: 'category',
    propertyValue: null,
    operator: 'ne' as Operator,
  };
  const operator = createAbstractOperator(filter);

  expect(operator).toEqual('is_not_null');
});

test('do not modify the filter operator', () => {
  const filter = {
    propertyName: 'category',
    propertyValue: null,
    operator: 'gt' as Operator,
  };
  const operator = createAbstractOperator(filter);

  expect(operator).toEqual(filter.operator);
});
