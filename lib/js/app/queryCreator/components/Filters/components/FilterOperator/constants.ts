import { Operator, Property } from '../../types';

export const FILTER_OPERATORS: {
  label: string;
  value: Operator;
  dataTypes: Property[];
}[] = [
  {
    label: 'Equal to',
    value: 'eq',
    dataTypes: ['String', 'Number', 'List', 'Boolean', 'Datetime'],
  },
  {
    label: 'Not equal to',
    value: 'ne',
    dataTypes: ['String', 'Number', 'List', 'Boolean', 'Datetime'],
  },
  {
    label: 'Greater than',
    value: 'gt',
    dataTypes: ['Number', 'Datetime', 'String'],
  },
  {
    label: 'Greater than or equal to',
    value: 'gte',
    dataTypes: ['Number', 'Datetime', 'String'],
  },
  {
    label: 'Less than',
    value: 'lt',
    dataTypes: ['Number', 'Datetime', 'String'],
  },
  {
    label: 'Less than or equal to',
    value: 'lte',
    dataTypes: ['Number', 'Datetime', 'String'],
  },
  {
    label: 'Property exists',
    value: 'exists',
    dataTypes: ['String', 'Number', 'Boolean'],
  },
  {
    label: 'String contains',
    value: 'contains',
    dataTypes: ['String'],
  },
  {
    label: 'String does not contain',
    value: 'not_contains',
    dataTypes: ['String'],
  },
  {
    label: 'Regex',
    value: 'regex',
    dataTypes: ['String'],
  },
  {
    label: 'Matches any value in a list',
    value: 'in',
    dataTypes: ['String', 'Number', 'List'],
  },
  {
    label: 'Within a given radius (geo)',
    value: 'within',
    dataTypes: ['Geo'],
  },
];
