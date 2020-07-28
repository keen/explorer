import getPropertyType from './getPropertyType';

test('extracts property type ', () => {
  const property = ['id', 'string'];

  expect(getPropertyType(property)).toEqual('string');
});
