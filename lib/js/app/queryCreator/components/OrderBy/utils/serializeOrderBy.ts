import { OrderBy } from '../../../types';

export const serializeOrderBy = (
  orderBy: OrderBy | OrderBy[] | string
): OrderBy[] => {
  if (typeof orderBy === 'string') {
    return [
      {
        propertyName: orderBy,
        direction: 'ASC',
      },
    ];
  }

  if (Array.isArray(orderBy)) return orderBy;
  if (typeof orderBy === 'object' && orderBy !== null) return [orderBy];

  return [];
};
