import { inferFilterType } from './inferFilterType';

import { Filter } from '../types';

const schema = {
  category: 'string',
};

test('infer "Geo" property type', () => {
  const filter: Filter = {
    propertyName: 'category',
    propertyValue: null,
    operator: 'within',
  };

  const propertyType = inferFilterType(filter, schema);

  expect(propertyType).toEqual('Geo');
});

test('inherits property type', () => {
  const filter: Filter = {
    propertyType: 'String',
    propertyName: 'category',
    propertyValue: null,
    operator: 'within',
  };

  const propertyType = inferFilterType(filter, schema);

  expect(propertyType).toEqual('String');
});

test('infer property type from schema', () => {
  const filter: Filter = {
    propertyName: 'category',
    propertyValue: null,
    operator: 'ne',
  };

  const propertyType = inferFilterType(filter, schema);

  expect(propertyType).toEqual('String');
});
