import { Coordinates } from '../../types';

export type FiltersValueComponent =
  | 'input-text'
  | 'input-number'
  | 'datepicker'
  | 'geo-coordinates'
  | 'boolean-switcher'
  | 'null-placeholder'
  | 'list';

export type FilterValue =
  | boolean
  | string
  | Coordinates
  | number
  | Function
  | string[]
  | number[];

export type SchemaProp =
  | 'num'
  | 'string'
  | 'bool'
  | 'datetime'
  | 'null'
  | 'list'
  | 'geo'
  | 'array';
