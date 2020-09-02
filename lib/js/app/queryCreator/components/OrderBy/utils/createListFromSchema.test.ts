import { createListFromSchema } from './createListFromSchema';

test('generate list from provided schema', () => {
  const schema = {
    'reference.value': 'num',
    'reference.options.geometry.articles.funnels.name': 'string',
    users: 'list',
  };
  const list = createListFromSchema(schema);

  expect(list).toMatchInlineSnapshot(
    [
      {
        path: 'reference.value',
        type: 'num',
      },
      {
        path: 'reference.options.geometry.articles.funnels.name',
        type: 'string',
      },
      {
        path: 'users',
        type: 'list',
      },
    ],
    `
    Array [
      Object {
        "path": "reference.value",
        "type": "num",
      },
      Object {
        "path": "reference.options.geometry.articles.funnels.name",
        "type": "string",
      },
      Object {
        "path": "users",
        "type": "list",
      },
    ]
  `
  );
});
