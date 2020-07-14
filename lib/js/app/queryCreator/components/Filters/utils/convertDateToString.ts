import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm';

export const convertDateToString = (valueSelected) => {
  const value = moment(valueSelected).isValid() ? valueSelected : moment(moment().format(DATE_FORMAT));
  const valueConverted = `${moment(value).format(DATE_FORMAT)}T${moment(value).format(
    TIME_FORMAT
  )}:00.000Z`;
  return valueConverted;
};
