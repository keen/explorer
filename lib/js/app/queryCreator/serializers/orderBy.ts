import { v4 as uuid } from 'uuid';

import { OrderBy } from '../types';

export const serializeOrderBy = (
  orderBy: string | OrderBy | OrderBy[]
): OrderBy[] => {
  if (typeof orderBy === 'string') {
    return [{ id: uuid(), propertyName: orderBy, direction: 'ASC' }];
  }

  if (Array.isArray(orderBy)) {
    return orderBy.map((item) => ({
      ...item,
      id: uuid(),
    }));
  }

  return [
    {
      ...(orderBy as OrderBy),
      id: uuid(),
    },
  ];
};
