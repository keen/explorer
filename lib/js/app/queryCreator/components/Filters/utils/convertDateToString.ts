import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm';

export const convertDateToString = (valueSelected) => {
  const value = valueSelected || moment(moment().format(DATE_FORMAT));
  const valueConverted = `${value.format(DATE_FORMAT)}T${value.format(
    TIME_FORMAT
  )}:00.000Z`;
  return valueConverted;
};