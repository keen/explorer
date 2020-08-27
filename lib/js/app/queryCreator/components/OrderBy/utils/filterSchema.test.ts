import { filterSchema } from './filterSchema';

import { OrderBy } from '../../../types';

test('filters schema when groupBy is provided', () => {
  const schema = {
    'reference.loremipsumdoloristametkadsdssdswfdsfdsfsdsfd': 'num',
    'reference.options.geometry.articles.funnels.name': 'string',
    users: 'list',
  };

  const groupBy = [
    'reference.loremipsumdoloristametkadsdssdswfdsfdsfsdsfd',
    'users',
  ];

  const filteredSchema = filterSchema(schema, groupBy);

  expect(filteredSchema).toMatchInlineSnapshot(`
    Object {
      "reference.loremipsumdoloristametkadsdssdswfdsfdsfsdsfd": "num",
      "result": "any",
      "users": "list",
    }
  `);
});

test('filters schema when groupBy and orderBy are provided', () => {
  const schema = {
    'reference.loremipsumdoloristametkadsdssdswfdsfdsfsdsfd': 'num',
    'reference.options.geometry.articles.funnels.name': 'string',
    users: 'list',
  };

  const groupBy = [
    'reference.loremipsumdoloristametkadsdssdswfdsfdsfsdsfd',
    'reference.options.geometry.articles.funnels.name',
    'users',
  ];
  const orderBy = [
    {
      propertyName: 'reference.loremipsumdoloristametkadsdssdswfdsfdsfsdsfd',
      direction: 'ASC',
    },
    {
      propertyName: 'reference.options.geometry.articles.funnels.name',
      direction: 'ASC',
    },
  ] as OrderBy[];
  const filteredSchema = filterSchema(schema, groupBy, orderBy);

  expect(filteredSchema).toMatchInlineSnapshot(`
    Object {
      "result": "any",
      "users": "list",
    }
  `);
});
