import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Label, Button, Checkbox, Title } from '@keen.io/ui-core';
import { FieldGroup } from '@keen.io/forms';

import EventCollection from '../EventCollection';
import TargetProperty from '../TargetProperty';
import Timeframe from '../Timeframe';
import Filters from '../Filters';

import {
  updateFunnelStep,
  selectFunnelStepCollection,
} from '../../modules/query';

import text from './text.json';

import { FunnelStep, Timeframe as TimeframeType, Filter } from '../../types';

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
  /** Funnel filers */
  filters: Filter[];
};

const FunnelStep: FC<Props> = ({
  index,
  eventCollection,
  actorProperty,
  timeframe,
  optional,
  inverted,
  withActors,
  filters = [],
  onRemove,
}) => {
  const dispatch = useDispatch();
  const updateStep = useCallback(
    (step: Partial<FunnelStep>) => dispatch(updateFunnelStep(index, step)),
    [index]
  );

  console.log(actorProperty, 'TARGET PROP');

  return (
    <div>
      <Title variant="h3">Step {index + 1}</Title>
      <EventCollection
        variant="secondary"
        collection={eventCollection}
        onChange={(collection) => {
          dispatch(selectFunnelStepCollection(collection));
          updateStep({ eventCollection: collection, actorProperty: undefined });
        }}
      />
      <TargetProperty
        variant="secondary"
        collection={eventCollection}
        property={actorProperty}
        onChange={(property) => {
          dispatch(
            updateStep({
              actorProperty: property,
            })
          );
        }}
      />
      <FieldGroup>
        <Timeframe
          id={`funnel_step_${index}`}
          value={timeframe}
          variant="secondary"
          timezone={2000}
          onTimezoneChange={() => {
            // @TODO: Handle timezone change
          }}
          onTimeframeChange={(value) =>
            dispatch(
              updateStep({
                timeframe: value,
              })
            )
          }
        />
      </FieldGroup>
      <Filters
        collection={eventCollection}
        filters={filters}
        onReset={() => {}}
        onRemove={() => {}}
        onChange={() => {}}
      />
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
