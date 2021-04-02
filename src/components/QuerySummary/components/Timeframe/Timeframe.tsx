import React, { FC } from 'react';
import { Timeframe } from '@keen.io/query';

import AbsoluteTimeframe from '../AbsoluteTimeframe';

type Props = {
  timeframe: Timeframe;
  timezone?: string | number;
};

const Timeframe: FC<Props> = ({ timeframe, timezone }) =>
  typeof timeframe !== 'string' ? (
    <AbsoluteTimeframe timeframe={timeframe} timezone={timezone} />
  ) : (
    <span>{timeframe}</span>
  );

export default Timeframe;
