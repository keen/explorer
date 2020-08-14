import { getAvailableWidgets } from './getAvailableWidgets';

import { DEFAULT_VISUALIZATIONS } from '../constants';

export const getVisualizations = (query: any) => {
  const widgets = getAvailableWidgets(query);

  if (widgets) return DEFAULT_VISUALIZATIONS.concat(widgets);
  return DEFAULT_VISUALIZATIONS;
};
