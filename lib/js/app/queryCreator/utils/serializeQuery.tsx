import camelCase from 'camelcase-keys';
import { ReducerState as QueryState } from '../modules/query';

export const serializeQuery = (query: Object): Partial<QueryState> =>
  camelCase(query, { deep: true });
