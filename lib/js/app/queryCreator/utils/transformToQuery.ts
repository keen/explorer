import snakeCase from 'snakecase-keys';
import { ReducerState as QueryState } from '../modules/query';

import { FIELDS_CONFIG } from '../config';

export const transformToQuery = (query: QueryState) => {
  const { analysisType, ...queryProperties } = query;
  const queryCopy = { ...queryProperties };

  Object.keys(queryProperties).forEach((fieldName) => {
    const fieldConfig = FIELDS_CONFIG[fieldName];
    if (fieldConfig && !fieldConfig.includes(analysisType)) {
      delete queryCopy[fieldName];
    }
  });

  return snakeCase({
    analysisType,
    ...queryCopy,
  });
};
