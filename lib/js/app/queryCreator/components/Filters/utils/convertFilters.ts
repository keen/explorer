import { Filter } from '../../../types';
import { Coordinates } from '../types';

const convertValueToJson = (value: string | number | Coordinates) => {
  if (typeof value === 'object') {
    const [long, lat] = value?.coordinates;
    const { maxDistanceMiles } = value;
    return {
      coordinates: [convertValueToJson(long), convertValueToJson(lat)],
      maxDistanceMiles: convertValueToJson(maxDistanceMiles),
    };
  }

  if (!!Number(value)) return Number(value);
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'Null') return null;

  if (new Date(value) && new Date(value).toString() !== 'Invalid Date')
    return value;

  if (typeof value === 'string' && value.includes(',')) {
    const result = value.split(',').map((item) => {
      let trimmedItem: string | number = item.trim();
      if (Number(trimmedItem)) trimmedItem = Number(trimmedItem);
      return trimmedItem;
    });

    return result;
  }

  return value;
};

export const convertFilters = (state: Filter[]) => {
  const result = state.map((item) => {
    const filter = item?.propertyValue
      ? {
          ...item,
          propertyValue: convertValueToJson(item.propertyValue),
        }
      : item;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { propertyType, ...convertedFilter } = filter;
    return convertedFilter;
  });

  return result;
};
