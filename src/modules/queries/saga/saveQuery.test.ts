/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { getContext, select, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';
import { Query } from '@keen.io/query';

import { saveQuery } from './saveQuery';
import { queriesSlice } from '../reducer';

import {
  getQuerySettingsModalVisibility,
  appSlice,
} from '../../../modules/app';

import { ERRORS } from '../constants';
import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../../constants';

import { APIError } from '../../../types';

const query: Query = {
  analysis_type: 'count',
  event_collection: 'logins',
  timeframe: 'this_14_days',
  interval: 'daily',
};

describe('Scenario 1: User successfully saves query', () => {
  const apiResonse = {
    success: true,
  };

  const action = queriesSlice.actions.saveQuery({
    name: 'logins',
    body: query,
  });
  const test = sagaHelper(saveQuery(action));

  test('get the notification manager from context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

    return {
      showNotification: jest.fn(),
    };
  });

  test('get the Keen API client instance from context', (result) => {
    expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

    return {
      put: jest.fn(),
      url: () => '@url',
      config: { masterKey: '@masterKey' },
    };
  });

  test('get settings modal visibility from state', (result) => {
    expect(result).toEqual(select(getQuerySettingsModalVisibility));
    return true;
  });

  test('calls API to save query resource', () => {
    return apiResonse;
  });

  test('hide query settings modal', (result) => {
    expect(result).toEqual(put(appSlice.actions.hideQuerySettingsModal()));
  });

  test('dispatch save query success action', (result) => {
    expect(result).toEqual(
      put(
        queriesSlice.actions.saveQuerySuccess({
          name: 'logins',
          body: apiResonse,
        })
      )
    );
  });
});

describe('Scenario 2: User failed to save query due to internal server error', () => {
  const action = queriesSlice.actions.saveQuery({
    name: 'logins',
    body: query,
  });

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
      value: ERRORS.OVER_LIMIT_ERROR,
    },
  });

  const test = sagaHelper(saveQuery(action));

  test('get the notification manager from context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

    return notificationManager;
  });

  test('get the Keen API client instance from context', (result) => {
    expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

    return {
      put: jest.fn(),
      url: () => '@url',
      config: { masterKey: '@masterKey' },
    };
  });

  test('get settings modal visibility from state', (result) => {
    expect(result).toEqual(select(getQuerySettingsModalVisibility));
    return true;
  });

  test('calls API to save query resource', () => {
    return error;
  });

  test('hide query settings modal', (result) => {
    expect(result).toEqual(put(appSlice.actions.hideQuerySettingsModal()));
  });

  test('displays error notification', () => {
    expect(notificationManager.showNotification).toHaveBeenCalledWith({
      type: 'error',
      message: 'notifications.save_query_error',
      showDismissButton: true,
      autoDismiss: false,
    });
  });

  test('set cached queries limit exceed', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setCacheQueryLimitExceed({ limitReached: true }))
    );
  });
});

describe('Scenario 3: User failed to save query due to exceed cached queries limit', () => {
  const action = queriesSlice.actions.saveQuery({
    name: 'logins',
    body: query,
  });

  const error: APIError = Object.defineProperties(new Error(), {
    body: {
      value: '@body',
    },
    status: {
      value: HttpStatus.METHOD_NOT_ALLOWED,
    },
    error_code: {
      value: ERRORS.TOO_MANY_CACHED_QUERIES,
    },
  });

  const test = sagaHelper(saveQuery(action));

  test('get the notification manager from context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

    return {
      showNotification: jest.fn(),
    };
  });

  test('get the Keen API client instance from context', (result) => {
    expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

    return {
      put: jest.fn(),
      url: () => '@url',
      config: { masterKey: '@masterKey' },
    };
  });

  test('get settings modal visibility from state', (result) => {
    expect(result).toEqual(select(getQuerySettingsModalVisibility));
    return true;
  });

  test('calls API to save query resource', () => {
    return error;
  });

  test('get settings modal visibility from state', (result) => {
    expect(result).toEqual(select(getQuerySettingsModalVisibility));

    return true;
  });

  test('set saved query error', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setSaveQueryError({ error }))
    );
  });

  test('set cached queries limit exceed', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setCacheQueryLimitExceed({ limitReached: true }))
    );
  });
});
