import { Property, Coordinates, FiltersValueComponent } from './types';

import { getCurrentDate } from './utils';

export const SEARCH_EXPAND_TIME = 300;

export const DATA_TYPES = {
  string: 'String',
  num: 'Number',
  datetime: 'Datetime',
  list: 'List',
  null: 'Null',
  bool: 'Boolean',
  geo: 'Geo',
};

export const TYPES_CONFIG: Record<
  Property,
  {
    [key: string]: {
      label: string;
      defaultValue:
        | boolean
        | string
        | Coordinates
        | number
        | Function
        | string[]
        | number[];
      component: FiltersValueComponent;
    };
  }
> = {
  Number: {
    eq: {
      label: 'equals',
      defaultValue: 0,
      component: 'input-number',
    },
    ne: {
      label: 'does not equal',
      defaultValue: 0,
      component: 'input-number',
    },
    gt: {
      label: 'is greater than',
      defaultValue: 0,
      component: 'input-number',
    },
    gte: {
      label: 'is greater than or equals',
      defaultValue: 0,
      component: 'input-number',
    },
    lt: {
      label: 'is less than',
      defaultValue: 0,
      component: 'input-number',
    },
    lte: {
      label: 'is less than or equals',
      defaultValue: 0,
      component: 'input-number',
    },
    in: {
      label: 'matches any of the values',
      defaultValue: [],
      component: 'list',
    },
    exists: {
      label: 'property exists',
      defaultValue: true,
      component: 'boolean-switcher',
    },
  },
  String: {
    contains: {
      label: 'contains',
      defaultValue: '',
      component: 'input-text',
    },
    not_contains: {
      label: 'does not contain',
      defaultValue: '',
      component: 'input-text',
    },
    eq: {
      label: 'is same as ',
      defaultValue: '',
      component: 'input-text',
    },
    ne: {
      label: 'is different than',
      defaultValue: '',
      component: 'input-text',
    },
    in: {
      label: 'matches any of the values',
      defaultValue: [],
      component: 'list',
    },
    exists: {
      label: 'property exists',
      defaultValue: true,
      component: 'boolean-switcher',
    },
    gt: {
      label: 'is greater than',
      defaultValue: '',
      component: 'input-text',
    },
    lt: {
      label: 'is less than',
      defaultValue: '',
      component: 'input-text',
    },
    regex: {
      label: 'matches regex',
      defaultValue: '',
      component: 'input-text',
    },
  },
  List: {
    eq: {
      label: 'equals',
      defaultValue: '',
      component: 'input-text',
    },
    ne: {
      label: 'does not equal',
      defaultValue: '',
      component: 'input-text',
    },
    in: {
      label: 'matches any of the values',
      defaultValue: [],
      component: 'list',
    },
    exists: {
      label: 'property exists',
      defaultValue: '',
      component: 'boolean-switcher',
    },
  },
  Boolean: {
    eq: {
      label: 'is',
      defaultValue: true,
      component: 'boolean-switcher',
    },
    ne: {
      label: 'is not',
      defaultValue: true,
      component: 'boolean-switcher',
    },
    exists: {
      label: 'property exists',
      defaultValue: true,
      component: 'boolean-switcher',
    },
  },
  Datetime: {
    eq: {
      label: 'is specific date',
      defaultValue: getCurrentDate,
      component: 'datepicker',
    },
    ne: {
      label: 'is not specific date',
      defaultValue: getCurrentDate,
      component: 'datepicker',
    },
    gt: {
      label: 'is after',
      defaultValue: getCurrentDate,
      component: 'datepicker',
    },
    gte: {
      label: 'is specific date or after',
      defaultValue: getCurrentDate,
      component: 'datepicker',
    },
    lt: {
      label: 'is before',
      defaultValue: getCurrentDate,
      component: 'datepicker',
    },
    lte: {
      label: 'is specific date or before',
      defaultValue: getCurrentDate,
      component: 'datepicker',
    },
    exists: {
      label: 'property exists',
      defaultValue: true,
      component: 'boolean-switcher',
    },
  },
  Geo: {
    within: {
      label: 'is within a given radius',
      defaultValue: {
        coordinates: [0, 0],
        maxDistanceMiles: undefined,
      },
      component: 'geo-coordinates',
    },
    exists: {
      label: 'property exists',
      defaultValue: true,
      component: 'boolean-switcher',
    },
  },
};
