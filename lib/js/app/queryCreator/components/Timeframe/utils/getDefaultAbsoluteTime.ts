import moment from 'moment-timezone';

import { Timezones } from '../../../types';

export const getDefaultAbsoluteTime = (timezoneValue: Timezones) => {
  const start = moment()
    .tz(timezoneValue)
    .subtract(1, 'day')
    .startOf('day')
    .format();
  const end = moment().tz(timezoneValue).startOf('day').format();

  return {
    start,
    end,
  };
};
