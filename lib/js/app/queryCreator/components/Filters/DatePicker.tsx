import React, { FC, useState } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';

import { convertDateToString } from './utils';

type Props = {
  /** Index */
  idx: number;
  /** Initial date */
  initialDate: string;
  /** Onchange handler */
  onChange: (idx: number, value: string) => void;
};

const DatePicker: FC<Props> = ({ idx, initialDate, onChange }) => {
  const [startFocus, setStartFocus] = useState(false);
  const startDate = moment.utc(initialDate);

  return (
    <div data-test="filter-datepicker">
      <SingleDatePicker
        date={startDate}
        onDateChange={(value) => {
          const valueConverted = convertDateToString(value);
          onChange(idx, valueConverted);
        }}
        focused={startFocus}
        onFocusChange={({ focused }) => setStartFocus(focused)}
        isOutsideRange={() => false}
        id={`date-picker-${idx}`}
        numberOfMonths={1}
        displayFormat={'YYYY-MM-DD'}
      />
      <TimePicker
        use12Hours
        showSecond={false}
        value={startDate}
        onChange={(value) => {
          const valueConverted = convertDateToString(value);
          onChange(idx, valueConverted);
        }}
      />
    </div>
  );
};

export default DatePicker;
