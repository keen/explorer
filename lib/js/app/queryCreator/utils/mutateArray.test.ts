import { mutateArray } from './mutateArray';

const array = [1, 2, 3, 4, 5];

test('should move the last item to the first place', () => {
  const sortedArray = mutateArray(array, 4, 0);
  expect(sortedArray).toEqual([5, 1, 2, 3, 4]);
});

test('should move the first item to the last place', () => {
  const sortedArray = mutateArray(array, 0, 4);
  expect(sortedArray).toEqual([2, 3, 4, 5, 1]);
});

test('should swap middle items', () => {
  const sortedArray = mutateArray(array, 2, 1);
  expect(sortedArray).toEqual([1, 3, 2, 4, 5]);
});
