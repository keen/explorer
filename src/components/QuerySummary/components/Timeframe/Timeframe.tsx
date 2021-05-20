import React, { FC } from 'react';
import { Timeframe as TimeframeType } from '@keen.io/query';
import { BodyText } from '@keen.io/typography';

import AbsoluteTimeframe from '../AbsoluteTimeframe';

type Props = {
  timeframe: TimeframeType;
  timezone?: string | number;
};

const Timeframe: FC<Props> = ({ timeframe, timezone }) =>
  typeof timeframe !== 'string' ? (
    <AbsoluteTimeframe timeframe={timeframe} timezone={timezone} />
  ) : (
    <BodyText variant="body2">{timeframe}</BodyText>
  );

export default Timeframe;
