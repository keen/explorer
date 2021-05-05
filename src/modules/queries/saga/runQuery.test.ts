/* eslint-disable @typescript-eslint/camelcase */
import { getContext, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import HttpStatus from 'http-status-codes';

import { Query } from '@keen.io/query';

import { runQuery } from './runQuery';
import { queriesSlice } from '../reducer';

import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../../constants';

import { ERRORS } from '../constants';

import { APIError } from '../../../types';

const query: Query = {
  analysis_type: 'count',
  event_collection: 'logins',
  timeframe: 'this_14_days',
  interval: 'daily',
};

describe('Scenario 1: User successfully run query', () => {
  const action = queriesSlice.actions.runQuery({ query });
  const test = sagaHelper(runQuery(action));

  test('get the Keen API client instance from context', (result) => {
    expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

    return {
      query: jest.fn(),
    };
  });

  test('calls API to run query', () => {
    return { query, result: 100 };
  });

  test('dispatch run query success action', (result) => {
    expect(result).toEqual(
      put(
        queriesSlice.actions.runQuerySuccess({
          results: { query, result: 100 },
        })
      )
    );
  });
});

describe('Scenario 2: User exceed run query limits', () => {
  const action = queriesSlice.actions.runQuery({ query });
  const test = sagaHelper(runQuery(action));

  const error: APIError = Object.defineProperties(new Error(), {
    body: {
      value: '@body',
    },
    status: {
      value: HttpStatus.METHOD_NOT_ALLOWED,
    },
    error_code: {
      value: ERRORS.TOO_MANY_QUERIES,
    },
  });

  test('get the Keen API client instance from context', (result) => {
    expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

    return {
      query: jest.fn(),
    };
  });

  test('calls API to run query', () => {
    return error;
  });

  test('dispatch run query error action', (result) => {
    expect(result).toEqual(put(queriesSlice.actions.runQueryError({ error })));
  });

  test('notifies user about exceeding query perform limits', (result) => {
    expect(result).toEqual(
      put(
        queriesSlice.actions.setQueryLimitReached({
          queriesExecutionLimitReached: true,
        })
      )
    );
  });
});

describe('Scenario 3: User failed to run query due to API internal error', () => {
  const action = queriesSlice.actions.runQuery({ query });
  const test = sagaHelper(runQuery(action));

  const notificationManager = {
    showNotification: jest.fn(),
  };

  const error: APIError = Object.defineProperties(new Error(), {
    body: {
      value: '@body',
    },
    status: {
      value: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    error_code: {
      value: null,
    },
  });

  test('get the Keen API client instance from context', (result) => {
    expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

    return {
      query: jest.fn(),
    };
  });

  test('calls API to run query', () => {
    return error;
  });

  test('dispatch run query error action', (result) => {
    expect(result).toEqual(put(queriesSlice.actions.runQueryError({ error })));
  });

  test('get the notification manager from context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

    return notificationManager;
  });

  test('displays error notification', () => {
    expect(notificationManager.showNotification).toHaveBeenCalledWith({
      type: 'error',
      translateMessage: false,
      message: '@body',
    });
  });
});
