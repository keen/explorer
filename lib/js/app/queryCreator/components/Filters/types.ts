export type Property =
  | 'String'
  | 'Number'
  | 'Datetime'
  | 'List'
  | 'Geo'
  | 'Boolean';

export type Operator =
  | 'or'
  | 'eq'
  | 'ne'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'exists'
  | 'in'
  | 'contains'
  | 'not_contains'
  | 'within'
  | 'regex';

export type FiltersValueComponent =
  | 'input-text'
  | 'input-number'
  | 'datepicker'
  | 'geo-coordinates'
  | 'boolean-switcher'
  | 'list';

export type SchemaProp =
  | 'num'
  | 'string'
  | 'bool'
  | 'datetime'
  | 'null'
  | 'list'
  | 'geo'
  | 'array';

export type Coordinates = {
  coordinates: [number, number];
  maxDistanceMiles: number;
};
