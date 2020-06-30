
import moment from 'moment';
import { Filter , PropertyType} from '../../../types';

export const getPropertyValue = ({ propertyType, filter }: {propertyType: PropertyType, filter: Filter}) => {
  let { propertyValue } = filter;

  if (propertyType === 'Datetime') {
    const coercedDate = new Date(propertyValue);
    if (coercedDate !== null && coercedDate.toString() !== 'Invalid Date') {
      propertyValue = moment(propertyValue);
    }
  }

  if (typeof propertyValue !== 'undefined') {
    if (['true', 'false'].includes(propertyValue.toString().toLowerCase())) {
      propertyValue = propertyValue.toString().toLowerCase();
    }
  }

  return propertyValue;
};