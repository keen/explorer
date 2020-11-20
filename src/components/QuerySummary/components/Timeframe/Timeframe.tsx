import React, { FC } from 'react';

import { Timeframe, Timezones } from '@keen.io/query-creator';
import AbsoluteTimeframe from '../AbsoluteTimeframe';

type Props = {
  timeframe: Timeframe;
  timezone?: Timezones | number;
};

const Timeframe: FC<Props> = ({ timeframe, timezone }) =>
  typeof timeframe !== 'string' ? (
    <AbsoluteTimeframe timeframe={timeframe} timezone={timezone} />
  ) : (
    <span>{timeframe}</span>
  );

export default Timeframe;
