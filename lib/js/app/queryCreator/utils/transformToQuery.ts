/* eslint-disable @typescript-eslint/no-unused-vars */
import snakeCase from 'snakecase-keys';

import { convertAbstractOperators } from './convertAbstractOperators';

import { ReducerState as QueryState, InitialQuery } from '../modules/query';

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

  const {
    filters,
    orderBy,
    propertyNames,
    steps,
    ...restQuerySettings
  } = queryCopy;
  const queryToTransform: InitialQuery = {
    analysisType,
    ...restQuerySettings,
  };

  if (filters) {
    queryToTransform.filters = filters.map(({ id, ...filter }) =>
      convertAbstractOperators(filter)
    );
  }

  if (orderBy) {
    queryToTransform.orderBy = orderBy.map(({ id, ...item }) => item);
  }

  if (propertyNames) {
    queryToTransform.propertyNames = queryCopy.propertyNames.map(
      ({ id, propertyName }) => propertyName
    );
  }

  if (steps) {
    queryToTransform.steps = steps.map(({ id, ...step }) => ({
      ...step,
      filters: step.filters.map(({ id, ...filter }) =>
        convertAbstractOperators(filter)
      ),
    }));
  }

  return snakeCase(queryToTransform);
};
