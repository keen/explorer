import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@keen.io/ui-core';

import text from './text.json';

import FunnelStep from '../FunnelStep';
import {
  addFunnelStep,
  removeFunnelStep,
  getFunnelSteps,
} from '../../modules/query';

const FunnelSteps: FC<{}> = () => {
  const dispatch = useDispatch();
  const steps = useSelector(getFunnelSteps);

  return (
    <div>
      funnel
      {steps.map(
        (
          {
            eventCollection,
            timeframe,
            inverted,
            optional,
            withActors,
            actorProperty,
          },
          idx
        ) => (
          <FunnelStep
            key={idx}
            index={idx}
            timeframe={timeframe}
            actorProperty={actorProperty}
            eventCollection={eventCollection}
            inverted={inverted}
            optional={optional}
            withActors={withActors}
            onRemove={() => dispatch(removeFunnelStep(idx))}
          />
        )
      )}
      <Button
        variant="secondary"
        style="outline"
        onClick={() => dispatch(addFunnelStep())}
      >
        {text.addStep}
      </Button>
    </div>
  );
};

export default FunnelSteps;
