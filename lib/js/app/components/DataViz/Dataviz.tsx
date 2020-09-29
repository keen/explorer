import React, { useRef, useEffect, forwardRef } from 'react';
import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';
import { KeenDataviz } from '@keen.io/dataviz';

import { VisulizationContainer } from './DataViz.styles';
import text from './text.json';

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

const Dataviz = forwardRef<HTMLDivElement, Props>(
  (
    { analysisResults, visualization, chartSettings, widgetSettings },
    containerRef
  ) => {
    const datavizRef = useRef(null);

    useEffect(() => {
      if (datavizRef.current) datavizRef.current.destroy();
      datavizRef.current = new KeenDataviz({
        container: `#${CONTAINER_ID}`,
        type: visualization,
        settings: {
          ...chartSettings,
        },
        widget: {
          ...DEFAULT_WIDGET_SETTINGS,
          ...widgetSettings,
        },
      });

      if (
        analysisResults.result &&
        Array.isArray(analysisResults.result) &&
        analysisResults.result.length === 0
      ) {
        datavizRef.current.error(text.noResults);
      } else {
        datavizRef.current.render(analysisResults);
      }
    }, [
      visualization,
      analysisResults,
      chartSettings,
      widgetSettings,
      containerRef,
    ]);

    return <VisulizationContainer id={CONTAINER_ID} ref={containerRef} />;
  }
);

Dataviz.displayName = 'Dataviz';

export default Dataviz;
