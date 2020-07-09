import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm';

export const convertDateToString = (valueSelected) => { console.log({ valueSelected });
  const value = valueSelected || moment(moment().format(DATE_FORMAT));
  const valueConverted = `${moment(value).format(DATE_FORMAT)}T${moment(value).format(
    TIME_FORMAT
  )}:00.000Z`;
  return valueConverted;
};