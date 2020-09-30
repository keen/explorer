import React, { FC, useState } from 'react';
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
import text from './text.json';

type Props = {
  step: FunnelStep;
  index: number;
};

const FunnelStep: FC<Props> = ({ step, index }) => {
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
          {text.step} {index + 1}
        </StepNumber>
        <Title>{eventCollection}</Title>
      </Header>
      {open && (
        <Content>
          <StyledTable.Table>
            <StyledTable.Body>
              {eventCollection && (
                <StyledTable.Row>
                  <StyledTable.Label>{text.eventStream}</StyledTable.Label>
                  <StyledTable.Value>{eventCollection}</StyledTable.Value>
                </StyledTable.Row>
              )}
              {actorProperty && (
                <StyledTable.Row>
                  <StyledTable.Label>{text.targetProperty}</StyledTable.Label>
                  <StyledTable.Value>
                    <PropertyName name={actorProperty} />
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
        </Content>
      )}
    </Container>
  );
};

export default FunnelStep;
