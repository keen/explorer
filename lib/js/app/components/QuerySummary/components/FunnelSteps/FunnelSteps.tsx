import React, { FC } from 'react';
import { FunnelStep as FunnelStepType } from '../../types';

import FunnelStep from '../FunnelStep';

type Props = {
  steps: FunnelStepType[];
};

const FunnelSteps: FC<Props> = ({ steps }) => {
  return (
    <>
      {steps.map((step, idx) => (
        <FunnelStep step={step} index={idx} key={idx} />
      ))}
    </>
  );
};

export default FunnelSteps;
