import React, { FC } from 'react';
import { FunnelStep as FunnelStepType } from '../../types';

import FunnelStep from '../FunnelStep';

type Props = {
  steps: FunnelStepType[];
  stepLabels?: string[];
};

const FunnelSteps: FC<Props> = ({ steps, stepLabels }) => {
  return (
    <div>
      {steps.map((step, idx) => (
        <FunnelStep
          step={step}
          index={idx}
          key={idx}
          label={stepLabels && stepLabels[idx]}
        />
      ))}
    </div>
  );
};

export default FunnelSteps;
