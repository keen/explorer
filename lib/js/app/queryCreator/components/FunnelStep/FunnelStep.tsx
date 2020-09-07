import React, { FC, useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { transparentize } from 'polished';
import { Label, Checkbox, Input } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import {
  CardWrapper,
  StepContainer,
  StepHeader,
  StepTitle,
  IconContainer,
  Settings,
  Clone,
  Close,
  Wrapper,
  Item,
  SmallItem,
  StepName,
  Incomplete,
} from './FunnelStep.styles';

import Title from '../Title';
import EventCollection from '../EventCollection';
import TargetProperty from '../TargetProperty';
import Timeframe from '../Timeframe';
import Hint from '../Hint';
import Filters from '../Filters';

import {
  updateFunnelStep,
  selectFunnelStepCollection,
  addFunnelStepFilter,
  updateFunnelStepFilter,
  removeFunnelStepFilter,
} from '../../modules/query';

import text from './text.json';

import {
  FunnelStep,
  Timeframe as TimeframeType,
  Filter,
  Timezones,
} from '../../types';

type Props = {
  /** Funnel step index */
  index: number;
  /** Funnel step unique id */
  id?: string;
  /** Funnel Step event collection */
  eventCollection?: string;
  /** Funnel Step actor property */
  actorProperty?: string;
  /** Funnel Step timeframe */
  timeframe: TimeframeType;
  /** Funnel Step timezone */
  timezone: number | Timezones;
  /** Remove event handler */
  onRemove: () => void;
  /** Inverted funnel step */
  inverted: boolean;
  /** Optional funnel step flag */
  optional: boolean;
  /** Funnel filers */
  filters: Filter[];
  /** Details visible */
  detailsVisible: boolean;
  /** Funnel step is first */
  isFirstStep: boolean;
  /** Funnel step is dragged */
  isDragged?: boolean;
  /** Details visible show/hide handler */
  setDetailsVisible: (id: string) => void;
  /** Clone funnel step handler */
  onClone: (id: string) => void;
};

const FunnelStep: FC<Props> = ({
  index,
  id,
  eventCollection,
  actorProperty,
  timeframe,
  timezone,
  optional,
  inverted,
  filters = [],
  detailsVisible,
  isFirstStep,
  isDragged,
  onRemove,
  setDetailsVisible,
  onClone,
}) => {
  const dispatch = useDispatch();

  const firstDetailsVisible = useRef(detailsVisible);

  const updateStep = useCallback(
    (step: Partial<FunnelStep>) => dispatch(updateFunnelStep(id, step)),
    [id]
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    firstDetailsVisible.current &&
      !detailsVisible &&
      setError(eventCollection === undefined || actorProperty === undefined);
  }, [eventCollection, actorProperty, detailsVisible]);

  const [stepName, setStepName] = useState(null);

  return (
    <StepContainer isDragged={isDragged}>
      <CardWrapper
        className="dragBar"
        data-testid="bar"
        onClick={() => setDetailsVisible(detailsVisible ? null : id)}
      >
        <StepHeader>
          <IconContainer>
            <Icon
              type={detailsVisible ? 'caret-down' : 'caret-right'}
              fill={transparentize(0.3, colors.black[100])}
            />
          </IconContainer>
          <StepTitle hasError={error}>
            {text.title} {index + 1}
            {error && <Incomplete>(incomplete)</Incomplete>}
            <StepName>{stepName ? stepName : eventCollection}</StepName>
          </StepTitle>
          <Settings>
            <Clone
              data-testid="clone-button"
              onClick={(e) => {
                e.stopPropagation();
                onClone(id);
              }}
            >
              {text.clone}
            </Clone>
            <Close
              data-testid="close-button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <Icon type="close" fill={colors.red[200]} />
            </Close>
          </Settings>
        </StepHeader>
      </CardWrapper>
      {detailsVisible && (
        <CardWrapper>
          <Wrapper>
            <Item>
              <EventCollection
                hasError={!eventCollection && error}
                variant="secondary"
                collection={eventCollection}
                onChange={(collection) => {
                  dispatch(selectFunnelStepCollection(collection));
                  updateStep({
                    eventCollection: collection,
                    actorProperty: undefined,
                  });
                }}
              />
            </Item>
            <Item>
              <TargetProperty
                hasError={!actorProperty && error}
                variant="secondary"
                collection={eventCollection}
                property={actorProperty}
                onChange={(property) => {
                  property &&
                    dispatch(
                      updateStep({
                        actorProperty: property,
                      })
                    );
                }}
              />
            </Item>
            <Item>
              <Timeframe
                id="timeframe"
                value={timeframe}
                timezone={timezone}
                variant="secondary"
                onTimeframeChange={(timeframe) =>
                  dispatch(
                    updateStep({
                      timeframe,
                    })
                  )
                }
                onTimezoneChange={(timezone) =>
                  dispatch(
                    updateStep({
                      timezone,
                    })
                  )
                }
              />
            </Item>
          </Wrapper>
          <Wrapper>
            <Filters
              collection={eventCollection}
              filters={filters}
              onRemove={(idx: number) =>
                dispatch(removeFunnelStepFilter(id, idx))
              }
              onChange={(idx: number, filter: Filter) =>
                dispatch(updateFunnelStepFilter(id, idx, filter))
              }
              onClick={(idx: string) => dispatch(addFunnelStepFilter(id, idx))}
            />
          </Wrapper>
          <Wrapper>
            <Item>
              <Title>{text.stepLabel}</Title>
              <Input
                type="text"
                variant="solid"
                id={`stepName-${id}-${index}`}
                placeholder={eventCollection && eventCollection}
                onChange={(e) => setStepName(e.target.value)}
                value={stepName ? stepName : ''}
              />
            </Item>
            <SmallItem>
              <Label disabled={isFirstStep} htmlFor={`optional-step-${index}`}>
                <Checkbox
                  type="secondary"
                  id={`optional-step-${index}`}
                  onChange={() =>
                    updateStep({
                      optional: !optional,
                    })
                  }
                  checked={!isFirstStep && optional}
                  disabled={isFirstStep}
                />
                {text.optionalLabel}
              </Label>
              <Hint
                type="info"
                message={
                  isFirstStep
                    ? text.firstStepOptionalTooltip
                    : text.optionalTooltip
                }
                fill={colors.blue[500]}
                height={16}
                width={16}
              />
            </SmallItem>
            <SmallItem>
              <Label disabled={isFirstStep} htmlFor={`inverted-step-${index}`}>
                <Checkbox
                  type="secondary"
                  id={`inverted-step-${index}`}
                  onChange={() =>
                    updateStep({
                      inverted: !inverted,
                    })
                  }
                  checked={!isFirstStep && inverted}
                  disabled={isFirstStep}
                />
                {text.invertedLabel}
              </Label>
              <Hint
                type="info"
                message={
                  isFirstStep
                    ? text.firstStepInvertedTooltip
                    : text.invertedTooltip
                }
                fill={colors.blue[500]}
                height={16}
                width={16}
              />
            </SmallItem>
          </Wrapper>
        </CardWrapper>
      )}
    </StepContainer>
  );
};

export default FunnelStep;
