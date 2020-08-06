const mutate = (array: any[], from: number, to: number) => {
  const startIndex = to < 0 ? array.length + to : to;

  if (startIndex >= 0 && startIndex < array.length) {
    const item = array.splice(from, 1)[0];
    array.splice(startIndex, 0, item);
  }

  return array;
};

export const mutateArray = (array: any[], from: number, to: number) => {
  array = [...array];
  mutate(array, from, to);
  return array;
};
