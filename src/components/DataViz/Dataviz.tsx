import React, { FC, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PickerWidgets, WidgetSettings } from '@keen.io/widget-picker';
import { KeenDataviz } from '@keen.io/dataviz';

import { VisulizationContainer } from './DataViz.styles';

import { isEmptyAnalysisResult } from './utils';
import { CONTAINER_ID } from './constants';
import { ChartSettings } from '../../types';

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
};

const Dataviz: FC<Props> = ({
  analysisResults,
  visualization,
  chartSettings,
  widgetSettings,
  presentationTimezone,
}) => {
  const { t } = useTranslation();
  const datavizRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    datavizRef.current = new KeenDataviz({
      container: containerRef.current,
      presentationTimezone,
      type: visualization,
      settings: chartSettings,
      widget: widgetSettings,
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
