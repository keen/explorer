import React, { FC } from 'react';
import moment from 'moment-timezone';

import { getTimezoneValue } from '../../../../queryCreator';
import { Container, Separator } from './AbsoluteTimeframe.styles';

import { Timezones } from '../../../../queryCreator';

import text from './text.json';

type Props = {
  timeframe: {
    start: string;
    end: string;
  };
  timezone: Timezones | number;
};

const AbsoluteTimeframe: FC<Props> = ({ timeframe, timezone }) => {
  const { start, end } = timeframe;
  const namedTimezone = getTimezoneValue(timezone);

  return (
    <Container>
      {moment(start).tz(namedTimezone).format('YYYY-MM-DD HH:mm')}
      <Separator>{text.separator}</Separator>
      {moment(end).tz(namedTimezone).format('YYYY-MM-DD HH:mm')}
    </Container>
  );
};

export default AbsoluteTimeframe;
