import getPropertyPath from './getPropertyPath';

test('extracts property path ', () => {
  const property = ['user.id', 'string'];

  expect(getPropertyPath(property)).toEqual('user.id');
});
