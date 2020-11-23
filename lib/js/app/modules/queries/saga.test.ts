/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import fetchMock from 'jest-fetch-mock';
import { getContext, put, take, select } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import {
  deleteQuery as deleteQueryFlow,
  runQuery as runQueryFlow,
  saveQuery as saveQueryFlow,
  checkOrganizationLimits as checkOrganizationLimitsFlow,
} from './saga';
import {
  saveQuery,
  saveQuerySuccess,
  runQuery,
  runQuerySuccess,
  runQueryError,
  deleteQuery,
  deleteQueryError,
  resetQueryResults,
  deleteQuerySuccess,
  setQueryLimitReached,
  setCacheQueryLimit,
  setCacheQueryLimitExceed,
} from './actions';

import {
  showConfirmation,
  getViewMode,
  setViewMode,
  selectFirstSavedQuery,
  hideQuerySettingsModal,
  getQuerySettingsModalVisibility,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
} from '../../modules/app';

import { ERRORS } from './constants';
import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../constants';

fetchMock.mockResponse(() => Promise.resolve(JSON.stringify({})));

describe('checkOrganizationLimits()', () => {
  describe('Scenario 1: User exceed organization limits', () => {
    const it = sagaHelper(checkOrganizationLimitsFlow());

    it('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      return {
        url: () => 'url',
        config: { masterKey: 'masterKey' },
      };
    });

    it('calls the API to check organization limits', () => {
      const response = {
        cached_queries: { limited: true, limit: 5, current_usage: 10 },
      };
      return response;
    });

    it('notfies user about exceed cache queries organization limit', (result) => {
      expect(result).toEqual(put(setCacheQueryLimitExceed(true)));
    });

    it('setup cache queries limit', (result) => {
      expect(result).toEqual(put(setCacheQueryLimit(5)));
    });
  });
});

describe('saveQuery()', () => {
  describe('Scenario 1: User successfully saves query', () => {
    const query = { analysis_type: 'count' };
    const action = saveQuery('purchases', query) as ReturnType<
      typeof saveQuery
    >;
    const it = sagaHelper(saveQueryFlow(action));

    it('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return {
        showNotification: jest.fn(),
      };
    });

    it('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      return {
        put: jest.fn(),
        url: () => 'url',
        config: { masterKey: 'masterKey' },
      };
    });

    it('get settings modal visibility from state', (result) => {
      expect(result).toEqual(select(getQuerySettingsModalVisibility));
      return true;
    });

    it('calls API to save query resource', () => {
      return {
        success: true,
      };
    });

    it('hide query settings modal', (result) => {
      expect(result).toEqual(put(hideQuerySettingsModal()));
    });

    it('dispatch save query success action', (result) => {
      expect(result).toEqual(
        put(saveQuerySuccess('purchases', { success: true }))
      );
    });
  });
});

describe('runQuery()', () => {
  describe('Scenario 1: User successfully run query', () => {
    const query = {};
    const action = runQuery(query) as ReturnType<typeof runQuery>;
    const it = sagaHelper(runQueryFlow(action));

    it('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      return {
        query: jest.fn(),
      };
    });

    it('calls API to run query', () => {
      return { analysis_type: 'count' };
    });

    it('dispatch run query success action', (result) => {
      expect(result).toEqual(put(runQuerySuccess({ analysis_type: 'count' })));
    });
  });

  describe('Scenario 2: User exceed run query limits', () => {
    const query = {};
    const action = runQuery(query) as ReturnType<typeof runQuery>;
    const it = sagaHelper(runQueryFlow(action));

    it('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      const error = new Error('message');
      (error as any).error_code = ERRORS.TOO_MANY_QUERIES;
      return error;
    });

    it('dispatch run query error action', (result) => {
      expect(result).toEqual(put(runQueryError(new Error('message') as any)));
    });

    it('notifies user about exceeding query perform limits', (result) => {
      expect(result).toEqual(put(setQueryLimitReached(true)));
    });
  });

  describe('Scenario 3: User failed to run query due to API internal error', () => {
    const query = {};
    const action = runQuery(query) as ReturnType<typeof runQuery>;
    const it = sagaHelper(runQueryFlow(action));

    it('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      const error = new Error('message');
      (error as any).error_code = HttpStatus.INTERNAL_SERVER_ERROR;
      return error;
    });

    it('dispatch run query error action', (result) => {
      expect(result).toEqual(put(runQueryError(new Error('message') as any)));
    });

    it('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));
    });
  });
});

describe('deleteQuery()', () => {
  describe('Scenario 1: User successfully delete query', () => {
    const action = deleteQuery('purchases') as ReturnType<typeof deleteQuery>;
    const it = sagaHelper(deleteQueryFlow(action));

    it('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return {
        showNotification: jest.fn(),
      };
    });

    it('shows confirmation modal', (result) => {
      expect(result).toEqual(
        put(showConfirmation('delete', { queryName: 'purchases' }))
      );
    });

    it('waits for user confirmation', (result) => {
      expect(result).toEqual(take([ACCEPT_CONFIRMATION, HIDE_CONFIRMATION]));

      return {
        type: ACCEPT_CONFIRMATION,
      };
    });

    it('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      return {
        url: jest.fn(),
        masterKey: jest.fn(),
        del: jest.fn().mockReturnThis(),
        auth: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
    });

    it('calls API to delete query resource', (keenClient) => {
      expect(keenClient.del).toHaveBeenCalled();
    });

    it('get application view from state', (result) => {
      expect(result).toEqual(select(getViewMode));
      return 'editor';
    });

    it('changes the application view', (result) => {
      expect(result).toEqual(put(setViewMode('browser')));
    });

    it('resets query results', (result) => {
      expect(result).toEqual(put(resetQueryResults()));
    });

    it('dispatch delete query success action', (result) => {
      expect(result).toEqual(put(deleteQuerySuccess('purchases')));
    });

    it('selects first query', (result) => {
      expect(result).toEqual(put(selectFirstSavedQuery()));
    });
  });

  describe('Scenario 2: User failed to delete query due to API internal error', () => {
    const action = deleteQuery('purchases') as ReturnType<typeof deleteQuery>;
    const it = sagaHelper(deleteQueryFlow(action));

    it('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return {
        showNotification: jest.fn(),
      };
    });

    it('shows confirmation modal', (result) => {
      expect(result).toEqual(
        put(showConfirmation('delete', { queryName: 'purchases' }))
      );
    });

    it('waits for user confirmation', (result) => {
      expect(result).toEqual(take([ACCEPT_CONFIRMATION, HIDE_CONFIRMATION]));

      return {
        type: ACCEPT_CONFIRMATION,
      };
    });

    it('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      const error = new Error('message');
      (error as any).status = HttpStatus.INTERNAL_SERVER_ERROR;
      return error;
    });

    it('shows the notification', (result) => {
      expect(result).toBeUndefined();
    });

    it('dispatch delete query error action', (result) => {
      expect(result).toEqual(put(deleteQueryError(new Error('message'))));
    });
  });

  describe('Scenario 3: User cancel delete query action', () => {
    const action = deleteQuery('purchases') as ReturnType<typeof deleteQuery>;
    const it = sagaHelper(deleteQueryFlow(action));

    it('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return {
        showNotification: jest.fn(),
      };
    });

    it('shows confirmation modal', (result) => {
      expect(result).toEqual(
        put(showConfirmation('delete', { queryName: 'purchases' }))
      );
    });

    it('waits for user confirmation', (result) => {
      expect(result).toEqual(take([ACCEPT_CONFIRMATION, HIDE_CONFIRMATION]));

      return {
        type: HIDE_CONFIRMATION,
      };
    });

    it('terminates the saga flow', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
