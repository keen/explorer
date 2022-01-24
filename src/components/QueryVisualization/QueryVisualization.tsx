import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Query } from '@keen.io/query';

import { PickerWidgets, WidgetSettings } from '@keen.io/widget-picker';
import { Container, JSONContainer } from './QueryVisualization.styles';

import { CONTAINER_ID } from './constants';
import DataViz from '../DataViz';

import JSONView from '../JSONView';
import { ChartSettings } from '../../types';
import { usePresentationTimezone } from '../../hooks/usePresentationTimezone';
import { GaugeChartMessage } from './components';
import { getViewMode } from '../../modules/app/selectors';

type Props = {
  /** Analysis results */
  queryResults: Record<string, any> & { query?: Query };
  /** Type of visualization widget */
  widgetType: PickerWidgets;
  /** Chart plot settings */
  chartSettings: ChartSettings;
  /** Widget settings */
  widgetSettings: WidgetSettings;
  /** Determines if chart is in edit mode */
  inEditMode?: boolean;
};

const QueryVisualization: FC<Props> = ({
  queryResults,
  chartSettings,
  widgetSettings,
  widgetType,
  inEditMode,
}) => {
  const useDataviz = widgetType !== 'json';

  const { getPresentationTimezone } = usePresentationTimezone(queryResults);
  const view = useSelector(getViewMode);

  return (
    <Container id={CONTAINER_ID} data-testid="query-visualization">
      <AnimatePresence>
        {view === 'editor' &&
          widgetType === 'gauge' &&
          !chartSettings['maxValue'] && <GaugeChartMessage />}
      </AnimatePresence>
      {useDataviz ? (
        <DataViz
          analysisResults={queryResults}
          inEditMode={inEditMode}
          chartSettings={chartSettings}
          widgetSettings={widgetSettings}
          presentationTimezone={getPresentationTimezone(queryResults)}
          visualization={widgetType as Exclude<PickerWidgets, 'json'>}
        />
      ) : (
        <JSONContainer data-testid="json-tree">
          <JSONView analysisResults={queryResults} />
        </JSONContainer>
      )}
    </Container>
  );
};

export default QueryVisualization;
