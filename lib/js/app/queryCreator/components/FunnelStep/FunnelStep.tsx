import React, { FC, useMemo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Select, Button, Checkbox, Title } from '@keen.io/ui-core';
import { FieldGroup } from '@keen.io/forms';

import EventCollection from '../EventCollection';
import Timeframe from '../Timeframe';

import {
  updateFunnelStep,
  updateFunnelStepEventCollection,
} from '../../modules/query';
import { getCollectionSchema } from '../../modules/events';

import text from './text.json';

import { FunnelStep, AppState, Timeframe as TimeframeType } from '../../types';

type Props = {
  /** Funnel step index */
  index: number;
  /** Funnel Step event collection */
  eventCollection?: string;
  /** Funnel Step actor property */
  actorProperty?: string;
  /** Funnel Step timeframe */
  timeframe: TimeframeType;
  /** Remove event handler */
  onRemove: () => void;
  /** Inverted funnel step */
  inverted: boolean;
  /** Optional funnel step flag */
  optional: boolean;
  /** Use actors properties */
  withActors: boolean;
};

const FunnelStep: FC<Props> = ({
  index,
  eventCollection,
  actorProperty,
  timeframe,
  optional,
  inverted,
  withActors,
  onRemove,
}) => {
  const dispatch = useDispatch();
  const collectionSchema = useSelector((state: AppState) =>
    getCollectionSchema(state, eventCollection)
  );

  const actorPropertyOptions = useMemo(() => {
    if (collectionSchema) {
      return Object.keys(collectionSchema).map((propertyName) => ({
        label: propertyName,
        value: propertyName,
      }));
    }

    return [];
  }, [collectionSchema]);

  useEffect(() => {
    if (actorProperty) {
      dispatch(
        updateStep({
          actorProperty: undefined,
        })
      );
    }
  }, [eventCollection]);

  const updateStep = useCallback(
    (step: Partial<FunnelStep>) => dispatch(updateFunnelStep(index, step)),
    [index]
  );

  return (
    <div>
      <Title variant="h3">Step {index + 1}</Title>
      <EventCollection
        collection={eventCollection}
        onChange={(collection) => {
          dispatch(updateFunnelStepEventCollection(collection));
          updateStep({ eventCollection: collection });
        }}
      />
      <FieldGroup>
        <Label>{text.actorPropertyLabel}</Label>
        <Select
          variant="solid"
          placeholder={text.actorPropertyPlaceholder}
          onChange={({ value }: { value: string }) =>
            dispatch(
              updateStep({
                actorProperty: value,
              })
            )
          }
          value={
            actorProperty
              ? { label: actorProperty, value: actorProperty }
              : null
          }
          options={actorPropertyOptions}
        />
      </FieldGroup>
      <FieldGroup>
        <Timeframe
          id={`funnel_step_${index}`}
          value={timeframe}
          onChange={(value) =>
            dispatch(
              updateStep({
                timeframe: value,
              })
            )
          }
        />
      </FieldGroup>
      <div>
        <Label htmlFor={`optional-step-${index}`}>
          <Checkbox
            id={`optional-step-${index}`}
            onChange={() =>
              updateStep({
                optional: !optional,
              })
            }
            checked={optional}
          />
          {text.optionalLabel}
        </Label>
        <Label htmlFor={`inverted-step-${index}`}>
          <Checkbox
            id={`inverted-step-${index}`}
            onChange={() =>
              updateStep({
                inverted: !inverted,
              })
            }
            checked={inverted}
          />
          {text.invertedLabel}
        </Label>
        <Label htmlFor={`actors-step-${index}`}>
          <Checkbox
            id={`actors-step-${index}`}
            onChange={() =>
              updateStep({
                withActors: !withActors,
              })
            }
            checked={withActors}
          />
          {text.withActorsLabel}
        </Label>
      </div>

      <Button variant="danger" style="outline" onClick={onRemove}>
        {text.removeStep}
      </Button>
    </div>
  );
};

export default FunnelStep;
