/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { getContext, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { fetchEventStreamProperties } from './fetchEventStreamProperties';

import { schemasSlice } from '../reducer';

import { KEEN_CLIENT_CONTEXT } from '../../../constants';

describe('Scenario 1: Succesfully fetch schema properties', () => {
  function* wrapper() {
    const result = yield* fetchEventStreamProperties('purchases');
    return result;
  }

  const schemaProperties = {
    'user.id': 'string',
    age: 'number',
    creation_date: 'datetime',
  };

  const apiResonse: Partial<Response> = {
    status: HttpStatus.OK,
    json: () => Promise.resolve(schemaProperties),
  };

  const test = sagaHelper(wrapper());

  test('get the Keen API client instance from context', (result) => {
    expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

    return {
      url: () => '@url',
      config: { masterKey: '@masterKey' },
    };
  });

  test('performs request to fetch schema properties', () => {
    return apiResonse;
  });

  test('parse JSON response', () => {
    return { properties: schemaProperties };
  });

  test('updates event stream properties count', (result) => {
    expect(result).toEqual(
      put(
        schemasSlice.actions.setEventStreamProperties({
          eventStream: 'purchases',
          propertiesCount: 3,
        })
      )
    );
  });

  test('returns schema properties', (result) => {
    expect(result).toEqual(schemaProperties);
  });
});

describe('Scenario 2: Fetch schema properties failed', () => {
  function* wrapper() {
    const result = yield* fetchEventStreamProperties('purchases');
    return result;
  }

  const test = sagaHelper(wrapper());

  test('get the Keen API client instance from context', (result) => {
    expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

    return {
      url: () => '@url',
      config: { masterKey: '@masterKey' },
    };
  });

  test('performs request to fetch schema properties', () => {
    return new Error();
  });

  test('returns empty schema properties', (result) => {
    expect(result).toEqual({});
  });
});
