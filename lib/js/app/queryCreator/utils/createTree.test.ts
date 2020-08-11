import { createTree } from './createTree';

test('creates JSON tree', () => {
  const records = {
    'category.id': 'string',
    'category.details.name': 'string',
    age: 'number',
  };

  expect(createTree(records)).toMatchSnapshot();
});