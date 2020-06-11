import { serializeOrderBy } from './serializeOrderBy';

import { OrderBy } from '../../../types';

test('serialize "string" orderBy settings', () => {
  const result = serializeOrderBy('user.id');

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "direction": "ASC",
        "propertyName": "user.id",
      },
    ]
  `);
});

test('serialize "object" orderBy settings', () => {
  const orderBy = { propertyName: 'user.id', direction: 'DESC ' };
  const result = serializeOrderBy(orderBy as OrderBy);

  expect(result).toEqual([orderBy]);
});

test('serialize empty orderBy settings', () => {
  const orderBy = undefined;
  const result = serializeOrderBy(orderBy);

  expect(result).toEqual([]);
});

test('serialize collection of order settings', () => {
  const orderBy = [{ propertyName: 'user.id', direction: 'DESC ' }];
  const result = serializeOrderBy(orderBy as OrderBy[]);

  expect(result).toEqual(orderBy);
});
