import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
  WIDGETS,
} from '@keen.io/widget-picker';

/**
 * Get default settings for visualization based on type.
 *
 * @param widgetType - HTMLElement reference
 * @return default settings objects
 *
 */
const getDefaultSettings = (
  widgetType: PickerWidgets
): {
  chartSettings: ChartSettings;
  widgetSettings: WidgetSettings;
} => {
  let chartSettings = {};
  let widgetSettings = {};

  const settings = WIDGETS.find(({ widget }) => widgetType === widget);
  if (settings) {
    const { defaultChartSettings, defaultWidgetSettings } = settings;
    chartSettings = defaultChartSettings;
    widgetSettings = defaultWidgetSettings;
  }

  return {
    chartSettings,
    widgetSettings,
  };
};

export default getDefaultSettings;
