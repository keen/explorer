import { Filter } from '../../../types';

const isFilterValid = (filter: Filter) =>
  !filter || !filter.operator || !filter.propertyValue || !filter.propertyValue
    ? false
    : true;

export const isStateValid = (state: Filter[]) =>
  state.every((filter) => isFilterValid(filter));
