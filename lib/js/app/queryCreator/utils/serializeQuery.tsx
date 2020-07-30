import camelCase from 'camelcase-keys';
import { ReducerState as QueryState } from '../modules/query';

export const serializeQuery = (query:  Record<string, any>): Partial<QueryState> =>
  camelCase(query, { deep: true });
