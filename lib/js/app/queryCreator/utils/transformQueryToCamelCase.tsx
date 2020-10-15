import camelCase from 'camelcase-keys';
import { InitialQuery } from '../modules/query';

export const transformQueryToCamelCase = (
  query: Record<string, any>
): Partial<InitialQuery> => camelCase(query, { deep: true });
