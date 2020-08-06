import { getTypeFromValue } from './getTypeFromValue';
import { Filter } from '../../../types';

export const getPropertyType = (item: Filter) => {
  const propertyType = item?.propertyType || getTypeFromValue(item);
  return propertyType ? propertyType : null;
};
