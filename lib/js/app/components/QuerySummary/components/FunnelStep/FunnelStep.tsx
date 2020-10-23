import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import Timeframe from '../Timeframe';
import StyledTable from '../Table';
import PropertyName from '../PropertyName';

import {
  Container,
  Header,
  IconContainer,
  StepNumber,
  Title,
  Content,
} from './FunnelStep.styles';

import { FunnelStep } from '../../types';

type Props = {
  step: FunnelStep;
  index: number;
};

const FunnelStep: FC<Props> = ({ step, index }) => {
  const { t } = useTranslation('browser');
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
          {t('query_summary.step')} {index + 1}
        </StepNumber>
        <Title>{eventCollection}</Title>
      </Header>
      {open && (
        <Content>
          <StyledTable.Table>
            <StyledTable.Body>
              {eventCollection && (
                <StyledTable.Row>
                  <StyledTable.Label>
                    {t('query_summary.event_stream')}
                  </StyledTable.Label>
                  <StyledTable.Value>{eventCollection}</StyledTable.Value>
                </StyledTable.Row>
              )}
              {actorProperty && (
                <StyledTable.Row>
                  <StyledTable.Label>
                    {t('query_summary.target_property')}
                  </StyledTable.Label>
                  <StyledTable.Value>
                    <PropertyName name={actorProperty} />
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
        </Content>
      )}
    </Container>
  );
};

export default FunnelStep;
