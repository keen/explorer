import React, { FC } from 'react';

import {
  Timeframe,
  FunnelSteps,
  PropertyName,
  StyledTable,
} from './components';
import { Wrapper } from './QuerySummary.styles';

import text from './text.json';

type Props = {
  querySettings: Record<string, any>;
  chartSettings: Record<string, any>;
};

const QuerySummary: FC<Props> = ({ querySettings, chartSettings }) => {
  const {
    query: {
      analysis_type: analysisType,
      event_collection: eventCollection,
      target_property: targetProperty,
      timeframe,
      timezone,
      filters,
      steps,
    },
  } = querySettings;

  const { stepLabels } = chartSettings;

  return (
    <Wrapper>
      <StyledTable.Table>
        <StyledTable.Body>
          {analysisType && (
            <StyledTable.Row>
              <StyledTable.Label>{text.analysis}</StyledTable.Label>
              <StyledTable.Value>{analysisType}</StyledTable.Value>
            </StyledTable.Row>
          )}
          {eventCollection && (
            <StyledTable.Row>
              <StyledTable.Label>{text.eventStream}</StyledTable.Label>
              <StyledTable.Value>{eventCollection}</StyledTable.Value>
            </StyledTable.Row>
          )}
          {targetProperty && (
            <StyledTable.Row>
              <StyledTable.Label>{text.targetProperty}</StyledTable.Label>
              <StyledTable.Value>
                <PropertyName name={targetProperty} />
              </StyledTable.Value>
            </StyledTable.Row>
          )}
          {timeframe && (
            <StyledTable.Row>
              <StyledTable.Label>{text.timeframe}</StyledTable.Label>
              <StyledTable.Value>
                <Timeframe timeframe={timeframe} timezone={timezone} />
              </StyledTable.Value>
            </StyledTable.Row>
          )}
          {!!filters?.length && (
            <StyledTable.Row>
              <StyledTable.Label>{text.appliedFilters}</StyledTable.Label>
              <StyledTable.Value>{filters.length}</StyledTable.Value>
            </StyledTable.Row>
          )}
        </StyledTable.Body>
      </StyledTable.Table>
      {steps && <FunnelSteps steps={steps} stepLabels={stepLabels} />}
    </Wrapper>
  );
};

export default QuerySummary;
