import { useContext, useMemo } from 'react';
import { WidgetSettings } from '@keen.io/widgets';

import { AppContext } from '../contexts';
import { ChartSettings } from '../types';
import { composeChartSettings } from '../utils/composeChartSettings';
import { DEFAULT_WIDGET_SETTINGS } from '../components/DataViz/constants';

type Params = {
  /** Chart settings to which the theming changes will be applied */
  chartSettings: ChartSettings;
  /** Widget settings to which the theming changes will be applied */
  widgetSettings: WidgetSettings;
  /** Dependencies array - if any of provided dependencies will change, the theme reapply will be triggered */
  dependencies: any[];
  /** Condition which determines if theme should be applied - helps to prevent costly computations when e.g widget is not visible */
  composeCondition?: boolean;
};

export const useApplyWidgetTheming = ({
  chartSettings,
  widgetSettings,
  dependencies = [],
  composeCondition = true,
}: Params) => {
  const { datavizSettings } = useContext(AppContext);
  const theme = datavizSettings.theme;

  const themedChartSettings = useMemo(() => {
    if (!composeCondition) {
      return chartSettings;
    }
    return composeChartSettings(chartSettings, theme) as ChartSettings;
  }, [...dependencies]);

  const themedWidgetSettings = useMemo(() => {
    if (!composeCondition) {
      return widgetSettings;
    }
    return {
      ...widgetSettings,
      ...DEFAULT_WIDGET_SETTINGS,
    };
  }, [...dependencies]);

  return {
    themedChartSettings,
    themedWidgetSettings,
  };
};
