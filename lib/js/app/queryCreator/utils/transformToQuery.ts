import snakeCase from 'snakecase-keys';
import { ReducerState as QueryState } from '../modules/query';

import { FIELDS_CONFIG } from '../config';

export const transformToQuery = (query: QueryState) => {
  const { analysis, ...queryProperties } = query;
  const queryCopy = {  ...queryProperties };

  Object.keys(queryProperties).forEach((fieldName) => {
    const fieldConfig = FIELDS_CONFIG[fieldName];
    if (!fieldConfig.includes(analysis)) {
      delete queryCopy[fieldName];
    }
  });

  return {
    analysis,
    ...snakeCase(queryCopy),
  };
};
