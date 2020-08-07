import React, { FC, memo } from 'react';
import moment from 'moment-timezone';

import { Container, TimeLabel, TimeRow } from './AbsoluteTime.styles';

import DatePicker from '../DatePicker';

import text from './text.json';

import { Timeframe, Timezones } from '../../types';

type Props = {
  /** Unique identifer */
  id: string;
  /** Time start */
  start: string;
  /** Time end */
  end: string;
  /** Absolute time change event handler */
  onChange: (time: Timeframe) => void;
  /** Timezone value */
  timezone: Timezones;
};

const AbsoluteTime: FC<Props> = memo(
  ({ id, start, end, timezone, onChange }) => {
    const startDate = moment(start).tz(timezone);
    const endDate = moment(end).tz(timezone);

    return (
      <Container data-testid="absolute-time">
        <TimeRow>
          <TimeLabel>{text.startDate}</TimeLabel>
          <DatePicker
            id={`${id}-start`}
            date={startDate}
            onChange={(date) => onChange({ start: date, end })}
          />
        </TimeRow>
        <TimeRow>
          <TimeLabel>{text.endDate}</TimeLabel>
          <DatePicker
            id={`${id}-end`}
            date={endDate}
            onChange={(date) => onChange({ start, end: date })}
          />
        </TimeRow>
      </Container>
    );
  }
);

AbsoluteTime.displayName = 'AbsoluteTime';

export default AbsoluteTime;
