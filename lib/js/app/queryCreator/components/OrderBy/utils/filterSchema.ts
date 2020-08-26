import { OrderBy as OrderBySettings } from '../../../types';

const initialItem = { result: 'any' };

export const filterSchema = (
  schema: any,
  groups: string[],
  orderBy: OrderBySettings[]
) => {
  const obj = { ...initialItem };
  for (const key in schema) {
    if (groups && groups.includes(key)) {
      obj[key] = schema[key];
    }
  }
  if (orderBy) {
    orderBy.map((item) => {
      if (obj[item.propertyName]) {
        delete obj[item.propertyName];
      }
    });
  }
  return obj;
};
