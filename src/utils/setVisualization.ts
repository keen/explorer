import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

import { getDefaultVisualization } from '../modules/queries';

type Settings = {
  type: PickerWidgets | null;
  chartSettings: ChartSettings;
  widgetSettings: WidgetSettings;
};

export const setVisualization = (
  query: Record<string, any>,
  settings: Settings
) => {
  const { type } = settings;
  if (type === null) {
    return getDefaultVisualization(query);
  }

  return settings;
};
