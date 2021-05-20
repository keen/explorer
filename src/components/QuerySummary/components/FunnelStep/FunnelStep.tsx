import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

import Timeframe from '../Timeframe';
import StyledTable from '../Table';
import PropertyName from '../PropertyName';

import {
  Container,
  Header,
  IconContainer,
  StepNumber,
  Content,
} from './FunnelStep.styles';

import { FunnelStep as FunnelStepType } from '../../types';

type Props = {
  step: FunnelStepType;
  index: number;
  label?: string;
};

const FunnelStep: FC<Props> = ({ step, index, label }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const {
    event_collection: eventCollection,
    actor_property: actorProperty,
    timeframe,
    timezone,
    filters,
  } = step;
  return (
    <Container>
      <Header onClick={() => setOpen(!open)} isOpen={open}>
        <IconContainer>
          <Icon
            type={open ? 'caret-down' : 'caret-right'}
            fill={transparentize(0.3, colors.black[100])}
          />
        </IconContainer>
        <StepNumber>
          <BodyText variant="body2" fontWeight="bold">
            {t('query_summary.step')} {index + 1}
          </BodyText>
        </StepNumber>
        <BodyText variant="body2" enableTextEllipsis>
          {label || eventCollection}
        </BodyText>
      </Header>
      {open && (
        <Content>
          <StyledTable.Table>
            <StyledTable.Body>
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
              {actorProperty && (
                <StyledTable.Row>
                  <StyledTable.Label>
                    <BodyText variant="body2" fontWeight="bold">
                      {t('query_summary.target_property')}
                    </BodyText>
                  </StyledTable.Label>
                  <StyledTable.Value>
                    <PropertyName name={actorProperty} />
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
        </Content>
      )}
    </Container>
  );
};

export default FunnelStep;
