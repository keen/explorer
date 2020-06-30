import moment from 'moment';

export const convertDateToString = (valueSelected) => {
  const value = valueSelected || moment(moment().format('YYYY-MM-DD'));
  const valueConverted = `${value.format('YYYY-MM-DD')}T${value.format(
    'HH:mm'
  )}:00.000Z`;
  return valueConverted;
};