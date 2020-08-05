import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { inputMixin } from '../Input';

export const Container = styled.div`
  display: flex;
  font-family: 'Lato Regular', sans-serif;
`;

export const TimeContainer = styled.div`
  .rc-time-picker-clear {
    display: none;
  }

  .rc-time-picker .rc-time-picker-input {
    ${inputMixin()}
  }
`;

export const DateContainer = styled.div`
  font-family: 'Lato Regular', sans-serif;
  margin-right: 5px;

  .SingleDatePickerInput__withBorder {
    border: none;
    border-radius: 0;
  }

  .SingleDatePicker_picker {
    top: 39px !important;
  }

  .CalendarDay__default:hover {
    background: ${transparentize(0.8, colors.green[100])};
    border: 1px solid ${transparentize(0.8, colors.green[100])};
  }

  .DayPicker__withBorder {
    border: solid 1px ${colors.gray[200]};
    box-shadow: 0 10px 24px 0 rgba(29, 39, 41, 0.15);
  }

  .DateInput {
    width: 100%;
  }

  .DateInput_input {
    ${inputMixin()}
  }

  .DateInput_fang {
    display: none;
  }

  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${colors.blue[500]};
    border: 1px double ${colors.blue[500]};
  }
`;
