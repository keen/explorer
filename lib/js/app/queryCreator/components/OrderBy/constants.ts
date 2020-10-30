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
  { label: 'DESC', value: 'DESC' },
  { label: 'ASC', value: 'ASC' },
];

export const DEFAULT_ORDER_SETTINGS = {
  propertyName: 'result',
  direction: 'ASC',
} as OrderBy;

export const DRAG_DELAY = 250;
export const DRAG_ANIMATION_TIME = 100;
