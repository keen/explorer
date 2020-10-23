import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Timeframe,
  FunnelSteps,
  PropertyName,
  StyledTable,
} from './components';
import { Wrapper } from './QuerySummary.styles';

type Props = {
  /** Query settings */
  querySettings: Record<string, any>;
};

const QuerySummary: FC<Props> = ({ querySettings }) => {
  const { t } = useTranslation('browser');
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

  return (
    <Wrapper>
      <StyledTable.Table>
        <StyledTable.Body>
          {analysisType && (
            <StyledTable.Row>
              <StyledTable.Label>
                {t('query_summary.analysis')}
              </StyledTable.Label>
              <StyledTable.Value>{analysisType}</StyledTable.Value>
            </StyledTable.Row>
          )}
          {eventCollection && (
            <StyledTable.Row>
              <StyledTable.Label>
                {t('query_summary.event_stream')}
              </StyledTable.Label>
              <StyledTable.Value>{eventCollection}</StyledTable.Value>
            </StyledTable.Row>
          )}
          {targetProperty && (
            <StyledTable.Row>
              <StyledTable.Label>
                {t('query_summary.target_property')}
              </StyledTable.Label>
              <StyledTable.Value>
                <PropertyName name={targetProperty} />
              </StyledTable.Value>
            </StyledTable.Row>
          )}
          {timeframe && (
            <StyledTable.Row>
              <StyledTable.Label>
                {t('query_summary.timeframe')}
              </StyledTable.Label>
              <StyledTable.Value>
                <Timeframe timeframe={timeframe} timezone={timezone} />
              </StyledTable.Value>
            </StyledTable.Row>
          )}
          {!!filters?.length && (
            <StyledTable.Row>
              <StyledTable.Label>
                {t('query_summary.applied_filters')}
              </StyledTable.Label>
              <StyledTable.Value>{filters.length}</StyledTable.Value>
            </StyledTable.Row>
          )}
        </StyledTable.Body>
      </StyledTable.Table>
      {steps && <FunnelSteps steps={steps} />}
    </Wrapper>
  );
};

export default QuerySummary;
