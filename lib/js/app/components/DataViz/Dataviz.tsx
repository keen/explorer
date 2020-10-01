import React, { FC, useRef, useEffect } from 'react';
import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';
import { KeenDataviz } from '@keen.io/dataviz';

import { VisulizationContainer } from './DataViz.styles';
import text from './text.json';

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
};

const Dataviz: FC<Props> = ({
  analysisResults,
  visualization,
  chartSettings,
  widgetSettings,
}) => {
  const datavizRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    datavizRef.current = new KeenDataviz({
      container: containerRef.current,
      type: visualization,
      settings: {
        ...chartSettings,
      },
      widget: {
        ...DEFAULT_WIDGET_SETTINGS,
        ...widgetSettings,
      },
    });

    if (isEmptyAnalysisResult(analysisResults)) {
      datavizRef.current.error(text.noResults);
    } else {
      datavizRef.current.render(analysisResults);
    }
  }, [visualization, chartSettings, widgetSettings, analysisResults]);

  return <VisulizationContainer id={CONTAINER_ID} ref={containerRef} />;
};

Dataviz.displayName = 'Dataviz';

export default Dataviz;
