import { serializeOrderBy } from './orderBy';

import { OrderBy } from '../types';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 'id'),
  };
});

test('serializes order by in "string" format', () => {
  const result = serializeOrderBy('group.id');

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "direction": "ASC",
        "id": "id",
        "propertyName": "group.id",
      },
    ]
  `);
});

test('serializes order by settings in "object" format', () => {
  const orderBy = { propertyName: 'surname', direction: 'ASC' };
  const result = serializeOrderBy(orderBy as OrderBy);

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "direction": "ASC",
        "id": "id",
        "propertyName": "surname",
      },
    ]
  `);
});

test('serializes order by settings collection', () => {
  const orderBy = [{ propertyName: 'email', direction: 'DESC' }];
  const result = serializeOrderBy(orderBy as OrderBy[]);

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "direction": "DESC",
        "id": "id",
        "propertyName": "email",
      },
    ]
  `);
});
