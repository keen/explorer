import moment from 'moment';

import { Property } from '../../../types';

export const setDefaultValue = (property: Property) => {
  switch (property) {
    case 'Number':
      return 0;
    case 'Datetime':
      return moment().startOf('day').format();
    case 'Boolean':
      return true;
    case 'Geo':
      return {
        coordinates: [0, 0],
        maxDistanceMiles: undefined,
      };
    default:
      return undefined;
  }
};
