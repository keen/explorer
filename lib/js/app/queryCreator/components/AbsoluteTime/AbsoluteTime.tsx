import React, { FC, useState, useMemo, memo } from 'react';
import moment from 'moment-timezone';
import 'react-dates/initialize';
import TimePicker from 'rc-time-picker';
import { SingleDatePicker } from 'react-dates';

import {
  Container,
  DatePicker,
  TimePickerContainer,
  TimeLabel,
  TimeRow,
} from './AbsoluteTime.styles';

import { use12HoursDateFormat } from './utils/hoursFormat';
import { DATE_FORMAT, TIME_PICKER_CLASS } from './constants';

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
    const [startFocus, setStartFocus] = useState(false);
    const [endFocus, setEndFocus] = useState(false);

    const startDate = moment(start).tz(timezone);
    const endDate = moment(end).tz(timezone);

    const use12Hours = useMemo(() => use12HoursDateFormat(), []);

    return (
      <Container data-testid="absolute-time">
        <TimeRow>
          <TimeLabel>{text.startDate}</TimeLabel>
          <DatePicker data-testid="date-start">
            <SingleDatePicker
              date={startDate}
              onDateChange={(valueSelected) => {
                if (valueSelected) {
                  onChange({
                    start: valueSelected.format(),
                    end,
                  });
                }
              }}
              focused={startFocus}
              onFocusChange={({ focused }) => setStartFocus(focused)}
              isOutsideRange={() => false}
              id={`${id}_start`}
              numberOfMonths={1}
              displayFormat={DATE_FORMAT}
              hideKeyboardShortcutsPanel
            />
          </DatePicker>
          <TimePickerContainer>
            <TimePicker
              popupClassName={TIME_PICKER_CLASS}
              use12Hours={use12Hours}
              showSecond={false}
              value={startDate}
              placement="bottomLeft"
              onChange={(valueSelected) => {
                onChange({
                  start: valueSelected.format(),
                  end,
                });
              }}
            />
          </TimePickerContainer>
        </TimeRow>
        <TimeRow>
          <TimeLabel>{text.endDate}</TimeLabel>
          <DatePicker data-testid="date-end">
            <SingleDatePicker
              date={endDate}
              onDateChange={(valueSelected) => {
                if (valueSelected) {
                  onChange({
                    start,
                    end: valueSelected.format(),
                  });
                }
              }}
              focused={endFocus}
              onFocusChange={({ focused }) => setEndFocus(focused)}
              isOutsideRange={() => false}
              id={`${id}_end`}
              numberOfMonths={1}
              displayFormat={DATE_FORMAT}
              hideKeyboardShortcutsPanel
            />
          </DatePicker>
          <TimePickerContainer>
            <TimePicker
              popupClassName={TIME_PICKER_CLASS}
              use12Hours={use12Hours}
              showSecond={false}
              value={endDate}
              onChange={(valueSelected) =>
                onChange({
                  start,
                  end: valueSelected.format(),
                })
              }
            />
          </TimePickerContainer>
        </TimeRow>
      </Container>
    );
  }
);

AbsoluteTime.displayName = 'AbsoluteTime';

export default AbsoluteTime;
