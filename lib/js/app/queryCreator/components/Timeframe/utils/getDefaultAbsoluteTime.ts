import moment from 'moment';

export const getDefaultAbsoluteTime = () => ({
  start: `${moment().subtract(1, 'day').format('YYYY-MM-DD')}T00:00:00.000Z`,
  end: `${moment().format('YYYY-MM-DD')}T00:00:00.000Z`,
});
