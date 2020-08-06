import { Filter, Property } from '../types';

import { SCHEMA_PROPS } from '../constants';

export const inferFilterType = (
  filter: Filter,
  schema: Record<string, string>
): Property => {
  const { operator, propertyType } = filter;
  if (propertyType) return propertyType;
  if (operator === 'within') return 'Geo';
  return SCHEMA_PROPS[schema[filter.propertyName]];
};
