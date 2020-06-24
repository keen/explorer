import { getDataTypeFromQuery } from './getDataTypeFromQuery';

import { DATA_TYPES, DEFAULT_VISUALIZATIONS } from '../constants';

export const getVisualizations = (query: any) => {
  const dataType = getDataTypeFromQuery(query);

  if (dataType) return DEFAULT_VISUALIZATIONS.concat(DATA_TYPES[dataType]);
  return DEFAULT_VISUALIZATIONS;
};
