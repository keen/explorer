import React, { FC, useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { transparentize } from 'polished';
import { useTranslation } from 'react-i18next';
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
  HintHighlight,
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
  /** Funnel step label */
  stepLabel?: string;
  /** Details visible show/hide handler */
  setDetailsVisible: (id: string) => void;
  /** Clone funnel step handler */
  onClone: (id: string) => void;
  /** Label change handler */
  onLabelChange?: (label: string, idx: number) => void;
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
  stepLabel = '',
  onRemove,
  setDetailsVisible,
  onClone,
  onLabelChange,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
            {t('query_creator_funnel_step.title')} {index + 1}
            {error && <Incomplete>(incomplete)</Incomplete>}
            <StepName>{stepLabel || eventCollection}</StepName>
          </StepTitle>
          <Settings>
            <Clone
              data-testid="clone-button"
              onClick={(e) => {
                e.stopPropagation();
                onClone(id);
              }}
            >
              {t('query_creator_funnel_step.clone')}
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
                    filters: [],
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
          <Wrapper display="block">
            <Filters
              collection={eventCollection}
              filters={filters}
              onRemove={(filterId: string) =>
                dispatch(removeFunnelStepFilter(id, filterId))
              }
              onChange={(filterId: string, filter: Filter) =>
                dispatch(updateFunnelStepFilter(id, filterId, filter))
              }
              onClick={(filterId: string) =>
                dispatch(addFunnelStepFilter(id, filterId))
              }
            />
          </Wrapper>
          <Wrapper>
            <Item>
              <Title>{t('query_creator_funnel_step.step_label')}</Title>
              <Input
                type="text"
                variant="solid"
                id={`stepName-${id}-${index}`}
                placeholder={eventCollection && eventCollection}
                onChange={(e) => {
                  onLabelChange && onLabelChange(e.target.value, index);
                }}
                value={stepLabel}
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
                {t('query_creator_funnel_step.optional_label')}
              </Label>
              <Hint
                type="info"
                message={
                  isFirstStep ? (
                    <>
                      {t('query_creator_funnel_step.optional_tooltip')}
                      <HintHighlight>
                        {t(
                          'query_creator_funnel_step.first_step_optional_tooltip'
                        )}
                      </HintHighlight>
                    </>
                  ) : (
                    t('query_creator_funnel_step.optional_tooltip')
                  )
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
                {t('query_creator_funnel_step.inverted_label')}
              </Label>
              <Hint
                type="info"
                message={
                  isFirstStep ? (
                    <>
                      {t('query_creator_funnel_step.inverted_tooltip')}
                      <HintHighlight>
                        {t(
                          'query_creator_funnel_step.first_step_inverted_tooltip'
                        )}
                      </HintHighlight>
                    </>
                  ) : (
                    t('query_creator_funnel_step.inverted_tooltip')
                  )
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
