import React, { FC } from 'react';
import { FilterSummary } from './components';
import {
  Wrapper,
  StyledTable,
  StyledBody,
  Row,
  Label,
  Value,
} from './QuerySummary.styles';

import { Filter } from './types';

type Props = {
  querySettings: Record<string, any>;
};

const QuerySummary: FC<Props> = ({ querySettings }) => {
  const {
    query: {
      analysis_type: analysisType,
      event_collection: eventCollection,
      target_property: targetProperty,
      timeframe,
      filters,
    },
  } = querySettings;

  return (
    <Wrapper>
      <StyledTable>
        <StyledBody>
          {analysisType && (
            <Row>
              <Label>Analysis:</Label>
              <Value>{analysisType}</Value>
            </Row>
          )}
          {eventCollection && (
            <Row>
              <Label>Event stream:</Label>
              <Value>{eventCollection}</Value>
            </Row>
          )}
          {targetProperty && (
            <Row>
              <Label>Target property:</Label>
              <Value>{targetProperty}</Value>
            </Row>
          )}
          {timeframe && (
            <Row>
              <Label>Timeframe:</Label>
              <Value>{timeframe}</Value>
            </Row>
          )}
          {!!filters?.length && (
            <Row>
              <Label>Filters:</Label>
              <Value>
                {filters.map((filter: Filter, idx: number) => (
                  <FilterSummary key={idx} filter={filter} />
                ))}
              </Value>
            </Row>
          )}
        </StyledBody>
      </StyledTable>
    </Wrapper>
  );
};

export default QuerySummary;
