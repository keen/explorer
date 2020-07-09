import { Filter } from '../../../types';
import { Coordinates } from '../types';

// export const convertValueToJson = (value: string) => { console.log({value}); console.log('convertValueToJson', value);
//   if (typeof value !== 'string') return value;
//   const result = value
//   .split(',')
//   .map(item => {
//     let trimmedItem:string|number = item.trim();
//     if (Number(trimmedItem)) trimmedItem = Number(trimmedItem);
//     return trimmedItem
//     }
//   );

//   return result;
// };

export const convertValueToJson = (value: string|Coordinates) => {
  if (typeof value === 'object') {
    const [long, lat] = value?.coordinates;
    const { maxDistanceMiles } = value;
    return {
      coordinates: [convertValueToJson(long), convertValueToJson(lat)],
      maxDistanceMiles: convertValueToJson(maxDistanceMiles)
    }
  }

  if (!!Number(value)) return Number(value);
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'Null') return null;

  if (new Date(value) && new Date(value).toString() !== 'Invalid Date') return value;

  if (value.includes(',')) {
    const result = value
    .split(',')
    .map(item => {
      let trimmedItem:string|number = item.trim();
      if (Number(trimmedItem)) trimmedItem = Number(trimmedItem);
      return trimmedItem
      }
    );

    return result;
  }

  return value;
}

export const convertFilters = (state: Filter[]) => {
  const result = state.map(filter => {
    if (filter?.propertyValue) {
      return {
        ...filter,
        propertyValue: convertValueToJson(filter.propertyValue)
      }
    }
    return filter;
  });

  return result;
}
