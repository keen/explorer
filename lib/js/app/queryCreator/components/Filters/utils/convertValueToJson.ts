export const parseValueToJson = (value: string) => {
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
