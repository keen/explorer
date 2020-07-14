import { convertDateToString } from './convertDateToString';
import { convertFilters } from './convertFilters';
import { getPropertyType } from './getPropertyType';
import { getTypeFromValue } from './getTypeFromValue';
import { isStateValid } from './isStateValid';
import { getOperatorOptions } from './getOperatorOptions';

import { FILTER_OPERATORS } from '../constants';
import { Filter } from '../../../types';

describe('convertDateToString', () => {
  test('convert date if value is empty', () => {
    const date = '2020-07-10';
    const convertedDate = convertDateToString(date);

    expect(convertedDate).toEqual('2020-07-10T00:00:00.000Z');
  })
});

describe('convertFilters', () => {
  test('convert value as string', () => {
    const filters = [{
      propertyName: 'propertyName',
      propertyValue: 'propertyValue',
      operator: 'eq'
    }] as Filter[];

    const convertedFilters = convertFilters(filters);
    expect(convertedFilters).toEqual(filters);
  });

  test('convert string to boolean', () => {
    const filters = [{
      propertyName: 'propertyName',
      propertyValue: 'true',
      operator: 'eq'
    }] as Filter[];

    const convertedFilters = convertFilters(filters);
    expect(convertedFilters[0].propertyValue).toEqual(true);
  });

  test('convert string to null', () => {
    const filters = [{
      propertyName: 'propertyName',
      propertyValue: 'Null',
      operator: 'eq'
    }] as Filter[];

    const convertedFilters = convertFilters(filters);
    expect(convertedFilters[0].propertyValue).toEqual(null);
  });

  test('convert string to list', () => {
    const filters = [{
      propertyName: 'propertyName',
      propertyValue: '1, 2, 3, a, b, c',
      operator: 'eq'
    }] as Filter[];

    const convertedFilters = convertFilters(filters);
    expect(convertedFilters[0].propertyValue).toEqual([1, 2, 3, 'a', 'b', 'c']);
  });

  test('convert string to null', () => {
    const filters = [{
      propertyName: 'propertyName',
      propertyValue: '2020-07-10T00:00:00.000Z',
      operator: 'eq'
    }] as Filter[];

    const convertedFilters = convertFilters(filters);
    expect(convertedFilters[0].propertyValue).toEqual('2020-07-10T00:00:00.000Z');
  });

  test('convert geo', () => {
    const filters = [{
      propertyName: 'propertyName',
      propertyValue: {
        coordinates: ['1', '2'],
        maxDistanceMiles: '3'
      },
      operator: 'eq'
    }] as Filter[];

    const convertedFilters = convertFilters(filters);
    expect(convertedFilters[0].propertyValue).toEqual({
      coordinates: [1, 2],
      maxDistanceMiles: 3
    });
  });
});

describe('getPropertyType', () => {
  test('return propertyType object', () => {
    const filter = {
      propertyName: 'propertyName',
      propertyValue: '1, 2, 3, a, b, c',
      operator: 'eq',
      propertyType: 'List'
    } as Filter;

    const propertyType = getPropertyType(filter);
    expect(propertyType).toEqual({ label: filter.propertyType, value: filter.propertyType})
  })
});

describe('getTypeFromValue', () => {
  test('get type if value is object', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: {
        coordinates: [1, 2],
        maxDistanceMiles: 3
      },
      operator: 'eq'
    };
    expect(getTypeFromValue(filter)).toEqual('Geo');
  });

  test('get type if value is string', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: 'propertyValue',
      operator: 'eq'
    };
    expect(getTypeFromValue(filter)).toEqual('String');
  });

  test('get type if operator is exists', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: 'propertyValue',
      operator: 'exists'
    };
    expect(getTypeFromValue(filter)).toEqual('Boolean');
  });

  test('get type if value is true', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: 'true',
      operator: 'eq'
    };
    expect(getTypeFromValue(filter)).toEqual('Boolean');
  });

  test('get type if operator is contains', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: '1',
      operator: 'contains'
    };
    expect(getTypeFromValue(filter)).toEqual('Number');
  });

  test('get type if value is date', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: '2020-07-10T00:00:00.000Z',
      operator: 'eq'
    };
    expect(getTypeFromValue(filter)).toEqual('Datetime');
  });

  test('get type if value is list', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: 'a, b, c',
      operator: 'eq'
    };
    expect(getTypeFromValue(filter)).toEqual('List');
  });

  test('get type if value is an array', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: [1, 2, 3],
      operator: 'eq'
    };
    expect(getTypeFromValue(filter)).toEqual('List');
  });

  test('get type if value is a boolean', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: true,
      operator: 'eq'
    };
    expect(getTypeFromValue(filter)).toEqual('Boolean');
  });

  test('get type if value is a number', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: 3,
      operator: 'eq'
    };
    expect(getTypeFromValue(filter)).toEqual('Number');
  });

  test('get type if value is a null', () => {
    const filter:Filter = {
      propertyName: 'propertyName',
      propertyValue: null,
      operator: 'eq'
    };
    expect(getTypeFromValue(filter)).toEqual('Null');
  });
});

describe('isStateValid', () => {
  test('state is incomplete', () => {
    const state = [{ propertyName: 'propertyName', operator: 'eq' }] as Filter[];

    expect(isStateValid(state)).toEqual(false);
  });

  test('state is complete', () => {
    const state = [{ propertyName: 'propertyName', operator: 'eq', propertyValue: 'propertyValue' }] as Filter[];

    expect(isStateValid(state)).toEqual(true);
  });
});

describe('getOperatorOptions', () => {
  test('no propertyType provided', () => {
    const operators = getOperatorOptions();

    expect(operators.length).toEqual(FILTER_OPERATORS.length)
  });

  test('operator options for Geo type', () => {
    const operators = getOperatorOptions('Geo');

    expect(operators.length).toEqual(1);
  });

  test('operator options for Null type', () => {
    const operators = getOperatorOptions('Null');

    expect(operators.length).toEqual(8);
  });
});
