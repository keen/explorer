import { createCollection } from './createCollection';

test('creates collection', () => {
  const collectionSchema = { date: 'String', userId: 'String' };

  expect(createCollection(collectionSchema)).toMatchSnapshot();
});
