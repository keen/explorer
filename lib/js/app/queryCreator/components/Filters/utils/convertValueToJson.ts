export const convertValueToJson = (value: string) => {
  if (typeof value !== 'string') return value;
  const result = value
  .split(',')
  .map(item => {
    let trimmedItem:string|number = item.trim();
    if (Number(trimmedItem)) trimmedItem = Number(trimmedItem);
    return trimmedItem
    }
  );

  return result;
};
