import React, { FC, memo } from 'react';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';

import { Container, TimeLabel, TimeRow } from './AbsoluteTime.styles';

import DatePicker from '../DatePicker';

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
    const { t } = useTranslation();
    const startDate = moment(start).tz(timezone);
    const endDate = moment(end).tz(timezone);

    return (
      <Container data-testid="absolute-time">
        <TimeRow>
          <TimeLabel>{t('absolute_time.start_date')}</TimeLabel>
          <DatePicker
            id={`${id}-start`}
            date={startDate}
            onChange={(date) => onChange({ start: date, end })}
          />
        </TimeRow>
        <TimeRow>
          <TimeLabel>{t('absolute_time.end_date')}</TimeLabel>
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
