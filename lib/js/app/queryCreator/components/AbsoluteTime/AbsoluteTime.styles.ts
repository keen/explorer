import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { inputMixin } from '../Input';

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${TimeRow} + ${TimeRow} {
    margin-top: 10px;
  }
`;

export const TimeLabel = styled.div`
  font-size: 14px;
  line-height: 17px;
  font-family: Lato Regular, sans-serif;
  color: ${colors.blue[500]};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-right: 10px;
  width: 35px;
`;

export const TimePickerContainer = styled.div`
  font-family: 'Lato Regular', sans-serif;
  flex-basis: 50%;

  .rc-time-picker-clear {
    display: none;
  }

  .rc-time-picker .rc-time-picker-input {
    ${inputMixin()}
  }
`;

export const DatePicker = styled.div`
  font-family: 'Lato Regular', sans-serif;
  flex-basis: 50%;
  margin-right: 5px;

  .SingleDatePickerInput__withBorder {
    border: none;
    border-radius: 0;
  }

  .SingleDatePicker_picker {
    top: 39px!important;
  }

  .CalendarDay__default:hover {
    background: ${transparentize(0.8, colors.green[100])};
    border: 1px solid ${transparentize(0.8, colors.green[100])};
  }

  .DayPicker__withBorder {
    border: solid 1px ${colors.gray[200]};
    box-shadow: 0 10px 24px 0 rgba(29, 39, 41, 0.15);
  }

  .DateInput_input {
    ${inputMixin()}
  }

  .DateInput_fang {
    display: none;
  }

  .CalendarDay__selected, .CalendarDay__selected:active, .CalendarDay__selected:hover {
    background: ${colors.blue[500]};
    border: 1px double ${colors.blue[500]};
`;
