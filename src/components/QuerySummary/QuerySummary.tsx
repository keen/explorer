import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyText } from '@keen.io/typography';

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
  chartSettings: Record<string, any>;
};

const QuerySummary: FC<Props> = ({ querySettings, chartSettings }) => {
  const { t } = useTranslation();
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
              <StyledTable.Label>
                <BodyText variant="body2" fontWeight="bold">
                  {t('query_summary.analysis')}
                </BodyText>
              </StyledTable.Label>
              <StyledTable.Value>
                <BodyText variant="body2">{analysisType}</BodyText>
              </StyledTable.Value>
            </StyledTable.Row>
          )}
          {eventCollection && (
            <StyledTable.Row>
              <StyledTable.Label>
                <BodyText variant="body2" fontWeight="bold">
                  {t('query_summary.event_stream')}
                </BodyText>
              </StyledTable.Label>
              <StyledTable.Value>
                <BodyText variant="body2">{eventCollection}</BodyText>
              </StyledTable.Value>
            </StyledTable.Row>
          )}
          {targetProperty && (
            <StyledTable.Row>
              <StyledTable.Label>
                <BodyText variant="body2" fontWeight="bold">
                  {t('query_summary.target_property')}
                </BodyText>
              </StyledTable.Label>
              <StyledTable.Value>
                <PropertyName name={targetProperty} />
              </StyledTable.Value>
            </StyledTable.Row>
          )}
          {timeframe && (
            <StyledTable.Row>
              <StyledTable.Label>
                <BodyText variant="body2" fontWeight="bold">
                  {t('query_summary.timeframe')}
                </BodyText>
              </StyledTable.Label>
              <StyledTable.Value>
                <Timeframe timeframe={timeframe} timezone={timezone} />
              </StyledTable.Value>
            </StyledTable.Row>
          )}
          {!!filters?.length && (
            <StyledTable.Row>
              <StyledTable.Label>
                <BodyText variant="body2" fontWeight="bold">
                  {t('query_summary.applied_filters')}
                </BodyText>
              </StyledTable.Label>
              <StyledTable.Value>
                <BodyText variant="body2">{filters.length}</BodyText>
              </StyledTable.Value>
            </StyledTable.Row>
          )}
        </StyledTable.Body>
      </StyledTable.Table>
      {steps && <FunnelSteps steps={steps} stepLabels={stepLabels} />}
    </Wrapper>
  );
};

export default QuerySummary;
