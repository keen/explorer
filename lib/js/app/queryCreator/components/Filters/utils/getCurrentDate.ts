import moment from 'moment';

export const getCurrentDate = () => moment().startOf('day').format();
