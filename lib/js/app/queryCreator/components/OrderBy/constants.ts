import { OrderBy } from '../../types';

export const ORDER_OPTIONS = [
  {
    label: 'result',
    value: 'result',
  },
];

export const DIRECTION_LABELS = {
  ASC: 'Ascending',
  DESC: 'Descending',
};

export const DIRECTION_OPTIONS = [
  { label: 'Ascending', value: 'ASC' },
  { label: 'Descending', value: 'DESC' },
];

export const DEFAULT_ORDER_SETTINGS = {
  propertyName: 'result',
  direction: 'ASC',
} as OrderBy;
