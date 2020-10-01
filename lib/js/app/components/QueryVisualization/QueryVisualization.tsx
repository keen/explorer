import React, { FC } from 'react';
import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

import { Container, JSONContainer } from './QueryVisualization.styles';

import DataViz from '../DataViz';
import JSONView from '../JSONView';

import { CONTAINER_ID } from './constants';

type Props = {
  /** Analysis results */
  queryResults: Record<string, any>;
  /** Type of visualization widget */
  widgetType: PickerWidgets;
  /** Chart plot settings */
  chartSettings: ChartSettings;
  /** Widget settings */
  widgetSettings: WidgetSettings;
};

const QueryVisualization: FC<Props> = ({
  queryResults,
  chartSettings,
  widgetSettings,
  widgetType,
}) => {
  const useDataviz = widgetType !== 'json';

  return (
    <Container id={CONTAINER_ID} data-testid="query-visualization">
      {useDataviz ? (
        <DataViz
          analysisResults={queryResults}
          chartSettings={chartSettings}
          widgetSettings={widgetSettings}
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
