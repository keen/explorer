import { getAvailableWidgets } from '@keen.io/widget-picker';

import { Visualization } from '../types';

/**
 * Creates default visualization settings. Used as fallback
 * for backward compatibility.
 *
 * @param query - query settings
 * @return visualization settings
 *
 */
const getDefaultVisualization = (query: Record<string, any>): Visualization => {
  const [defaultWidget] = getAvailableWidgets(query);
  return {
    type: defaultWidget,
    chartSettings: {},
    widgetSettings: {},
  };
};

export default getDefaultVisualization;
