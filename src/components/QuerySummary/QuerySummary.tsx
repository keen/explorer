import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyText } from '@keen.io/typography';

import {
  Timeframe,
  FunnelSteps,
  PropertyName,
  StyledTable,
  Analyses,
} from './components';
import { transformName } from './utils';
import {
  HintContainer,
  IconContainer,
  TooltipMotion,
  Wrapper,
} from './QuerySummary.styles';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { AnimatePresence } from 'framer-motion';
import { TOOLTIP_MOTION } from '../../constants';
import { Tooltip } from '@keen.io/ui-core';
import TooltipContent from '../TooltipContent';

type Props = {
  /** Query settings */
  querySettings: Record<string, any>;
  /** Chart settings */
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
      analyses,
    },
  } = querySettings;

  const { stepLabels } = chartSettings;

  const [showTooltip, setTooltipVisibility] = useState(false);

  return (
    <Wrapper>
      {analysisType === 'multi_analysis' && (
        <HintContainer>
          <BodyText variant="body1" fontWeight="bold">
            {t('query_summary.multi_analysis')}
          </BodyText>
          <IconContainer
            data-testid="tooltip-container"
            onMouseEnter={() => setTooltipVisibility(true)}
            onMouseLeave={() => setTooltipVisibility(false)}
          >
            <Icon type="info" fill={colors.blue[500]} height={16} width={16} />
            <AnimatePresence>
              {showTooltip && (
                <TooltipMotion {...TOOLTIP_MOTION}>
                  <Tooltip hasArrow={false}>
                    <TooltipContent
                      width={180}
                      color={colors.black[100]}
                      enableWrap
                    >
                      {t('query_summary.multi_analysis_tooltip')}
                    </TooltipContent>
                  </Tooltip>
                </TooltipMotion>
              )}
            </AnimatePresence>
          </IconContainer>
        </HintContainer>
      )}
      <StyledTable.Table>
        <StyledTable.Body>
          {analysisType && (
            <StyledTable.Row>
              <StyledTable.Label>
                <BodyText variant="body2" fontWeight="bold">
                  {analysisType === 'multi_analysis'
                    ? t('query_summary.analyses')
                    : t('query_summary.analysis')}
                </BodyText>
              </StyledTable.Label>
              <StyledTable.Value>
                {analyses ? (
                  <Analyses analyses={analyses} />
                ) : (
                  <BodyText variant="body2">
                    {transformName(analysisType)}
                  </BodyText>
                )}
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
