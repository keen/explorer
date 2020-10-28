import React, { FC, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';
import { KeenDataviz } from '@keen.io/dataviz';
import { Theme } from '@keen.io/charts';

import { VisulizationContainer } from './DataViz.styles';

import { isEmptyAnalysisResult } from './utils';

import { CONTAINER_ID, DEFAULT_WIDGET_SETTINGS } from './constants';

type Props = {
  /** Query execution results */
  analysisResults: Record<string, any>;
  /** Visualization type */
  visualization: Exclude<PickerWidgets, 'json'>;
  /** Chart plot settings */
  chartSettings: ChartSettings;
  /** Widget settings */
  widgetSettings: WidgetSettings;
  /** Visualizations theme settings */
  visualizationTheme?: Theme;
};

const Dataviz: FC<Props> = ({
  analysisResults,
  visualization,
  chartSettings,
  widgetSettings,
  visualizationTheme,
}) => {
  const { t } = useTranslation();
  const datavizRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const themeSettings = visualizationTheme
      ? {
          theme: visualizationTheme,
        }
      : {};

    datavizRef.current = new KeenDataviz({
      container: containerRef.current,
      type: visualization,
      settings: {
        ...chartSettings,
        ...themeSettings,
      },
      widget: {
        ...DEFAULT_WIDGET_SETTINGS,
        ...widgetSettings,
      },
    });

    if (isEmptyAnalysisResult(analysisResults)) {
      datavizRef.current.error(t('dataviz.no_results'));
    } else {
      datavizRef.current.render(analysisResults);
    }
  }, [visualization, chartSettings, widgetSettings, analysisResults]);

  return <VisulizationContainer id={CONTAINER_ID} ref={containerRef} />;
};

Dataviz.displayName = 'Dataviz';

export default Dataviz;
