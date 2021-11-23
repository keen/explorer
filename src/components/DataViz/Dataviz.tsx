import React, { FC, useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PickerWidgets, WidgetSettings } from '@keen.io/widget-picker';
import { KeenDataviz } from '@keen.io/dataviz';

import { VisulizationContainer } from './DataViz.styles';

import { isEmptyAnalysisResult } from './utils';
import { CONTAINER_ID, DEFAULT_WIDGET_SETTINGS } from './constants';
import { ChartSettings } from '../../types';
import { AppContext } from '../../contexts';

type Props = {
  /** Query execution results */
  analysisResults: Record<string, any>;
  /** Visualization type */
  visualization: Exclude<PickerWidgets, 'json'>;
  /** Chart plot settings */
  chartSettings: ChartSettings;
  /** Widget settings */
  widgetSettings: WidgetSettings;
  /** Presentation timezone */
  presentationTimezone?: string | number;
  /** Determines if chart is in edit mode */
  inEditMode?: boolean;
};

const Dataviz: FC<Props> = ({
  analysisResults,
  visualization,
  chartSettings,
  widgetSettings,
  presentationTimezone,
  inEditMode,
}) => {
  const { t } = useTranslation();
  const datavizRef = useRef(null);
  const containerRef = useRef(null);
  const { chartEventsPubSub } = useContext(AppContext);

  useEffect(() => {
    datavizRef.current = new KeenDataviz({
      container: containerRef.current,
      inEditMode: inEditMode,
      eventBus: chartEventsPubSub,
      presentationTimezone,
      type: visualization,
      settings: chartSettings,
      widget: {
        ...widgetSettings,
        card: DEFAULT_WIDGET_SETTINGS.card,
      },
    });

    if (isEmptyAnalysisResult(analysisResults)) {
      datavizRef.current.error(t('dataviz.no_results'));
    } else {
      datavizRef.current.render(analysisResults);
    }
  }, [
    inEditMode,
    visualization,
    chartSettings,
    widgetSettings,
    analysisResults,
  ]);

  useEffect(() => {
    return () => {
      if (datavizRef.current) {
        datavizRef.current.destroy();
      }
    };
  }, []);

  return <VisulizationContainer id={CONTAINER_ID} ref={containerRef} />;
};

Dataviz.displayName = 'Dataviz';

export default Dataviz;
