import { convertAbstractOperators } from './convertAbstractOperators';

import { Filter } from '../types';

test('converts "is_null" abstract operator', () => {
  const filter: Filter = {
    propertyType: 'String',
    propertyName: 'Category',
    propertyValue: null,
    operator: 'is_null',
  };
  const result = convertAbstractOperators(filter);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "operator": "eq",
      "propertyName": "Category",
      "propertyType": "String",
      "propertyValue": null,
    }
  `);
});

test('converts "is_not_null" abstract operator', () => {
  const filter: Filter = {
    propertyType: 'Number',
    propertyName: 'Category',
    propertyValue: null,
    operator: 'is_not_null',
  };
  const result = convertAbstractOperators(filter);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "operator": "ne",
      "propertyName": "Category",
      "propertyType": "Number",
      "propertyValue": null,
    }
  `);
});
