import React, { FC, useCallback } from 'react';
import { Query } from '@keen.io/query';
import { getOffsetFromDate } from '@keen.io/time-utils';
import { PickerWidgets, WidgetSettings } from '@keen.io/widget-picker';

import { Container, JSONContainer } from './QueryVisualization.styles';
import { CONTAINER_ID } from './constants';

import DataViz from '../DataViz';
import JSONView from '../JSONView';

import { ChartSettings } from '../../types';

type Props = {
  /** Analysis results */
  queryResults: Record<string, any> & { query?: Query };
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

  const getPresentationTimezone = useCallback(
    (queryResults: Record<string, any> & { query?: Query }) => {
      if ('query' in queryResults) {
        const {
          query: { timeframe, timezone },
        } = queryResults;
        if (typeof timeframe === 'string') return timezone;
        return getOffsetFromDate(timeframe.start);
      }

      return null;
    },
    []
  );

  return (
    <Container id={CONTAINER_ID} data-testid="query-visualization">
      {useDataviz ? (
        <DataViz
          analysisResults={queryResults}
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
