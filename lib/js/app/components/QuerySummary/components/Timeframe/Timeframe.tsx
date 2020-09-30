import React, { FC } from 'react';

import AbsoluteTimeframe from '../AbsoluteTimeframe';
import { Timeframe, Timezones } from '../../../../queryCreator';

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
