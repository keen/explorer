import { v4 as uuid } from 'uuid';

import { inferFilterType, createAbstractOperator } from '../utils';

import { Filter } from '../types';

export const serializeFilters = (
  filters: Filter[],
  schema: Record<string, string>
): Filter[] =>
  filters.map((filter) => ({
    ...filter,
    id: uuid(),
    operator: createAbstractOperator(filter),
    propertyType: inferFilterType(filter, schema),
  }));
