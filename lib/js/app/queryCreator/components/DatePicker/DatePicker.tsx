import React, { FC, useState, useMemo } from 'react';
import { Moment } from 'moment';
import 'react-dates/initialize';
import TimePicker from 'rc-time-picker';
import { SingleDatePicker } from 'react-dates';

import {
  Container,
  DateContainer,
  TimeContainer,
  GlobalStyle,
} from './DatePicker.styles';

import { use12HoursDateFormat } from '../../utils';
import { DATE_FORMAT, TIME_PICKER_CLASS } from './constants';

type Props = {
  /** Change event handler */
  onChange: (date: string) => void;
  /** Date as moment.js instance */
  date: Moment;
  /** Unique identifer */
  id: string;
};

const DatePicker: FC<Props> = ({ date, id, onChange }) => {
  const [focused, setFocus] = useState(false);
  const use12Hours = useMemo(() => use12HoursDateFormat(), []);

  return (
    <Container>
      <GlobalStyle />
      <DateContainer data-testid={id}>
        <SingleDatePicker
          date={date}
          onDateChange={(valueSelected) => {
            if (valueSelected) {
              onChange(valueSelected.format());
            }
          }}
          focused={focused}
          onFocusChange={({ focused }) => setFocus(focused)}
          id={id}
          isOutsideRange={() => false}
          numberOfMonths={1}
          displayFormat={DATE_FORMAT}
          hideKeyboardShortcutsPanel
        />
      </DateContainer>
      <TimeContainer>
        <TimePicker
          popupClassName={TIME_PICKER_CLASS}
          use12Hours={use12Hours}
          showSecond={false}
          value={date}
          placement="bottomLeft"
          onChange={(valueSelected) => {
            onChange(valueSelected.format());
          }}
        />
      </TimeContainer>
    </Container>
  );
};

export default DatePicker;
