import React, { FC } from 'react';
import { Query } from '@keen.io/query';
import { PickerWidgets, WidgetSettings } from '@keen.io/widget-picker';

import { Container, JSONContainer } from './QueryVisualization.styles';
import { CONTAINER_ID } from './constants';

import DataViz from '../DataViz';
import JSONView from '../JSONView';

import { ChartSettings } from '../../types';
import { usePresentationTimezone } from '../../hooks/usePresentationTimezone';

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

  return (
    <Container id={CONTAINER_ID} data-testid="query-visualization">
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
