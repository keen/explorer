import { Filter } from '../../../types';

export const isFilterValid = (filter: Filter) => (!filter || !filter.operator || !filter.propertyValue || !filter.propertyValue ) ? false : true;