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
  extractToEmail as extractToEmailFlow,
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
  showEmailExtractionModal,
  hideEmailExtractionModal,
  HIDE_CONFIRMATION,
  ACCEPT_CONFIRMATION,
  HIDE_EMAIL_EXTRACTION_MODAL,
} from '../../modules/app';

import { ERRORS, RUN_EMAIL_EXTRACTION } from './constants';
import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../constants';
import { getQuerySettings } from './selectors';

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

describe('extractToEmail()', () => {
  describe('Scenario 1: User successfully extracts to email', () => {
    const it = sagaHelper(extractToEmailFlow());
    const notificationManager = {
      showNotification: jest.fn(),
    };
    it('shows email extraction modal', (result) => {
      expect(result).toEqual(put(showEmailExtractionModal()));
    });
    it('waits for user input', (result) => {
      expect(result).toEqual(
        take([HIDE_EMAIL_EXTRACTION_MODAL, RUN_EMAIL_EXTRACTION])
      );
      return {
        type: RUN_EMAIL_EXTRACTION,
        payload: {},
      };
    });
    it('gets client context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));
      return {
        query: jest.fn(),
        url: () => 'url',
        config: { masterKey: 'masterKey' },
      };
    });
    it('gets notification manager context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));
      return notificationManager;
    });
    it('gets query settings from state', (result) => {
      expect(result).toEqual(select(getQuerySettings));
    });
    it('hides email extraction modal', (result) => {
      expect(result).toEqual(put(hideEmailExtractionModal()));
    });
    it('calls API to extract to email', () => {
      return { success: true };
    });
    it('shows email extraction success notification', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        autoDismiss: true,
        message: 'notifications.prepeare_email_extraction',
        type: 'info',
      });
    });
  });

  describe('Scenario 2: User failed to extract to email due to internal server error', () => {
    const it = sagaHelper(extractToEmailFlow());
    const notificationManager = {
      showNotification: jest.fn(),
    };

    it('shows email extraction modal', (result) => {
      expect(result).toEqual(put(showEmailExtractionModal()));
    });
    it('waits for user input', (result) => {
      expect(result).toEqual(
        take([HIDE_EMAIL_EXTRACTION_MODAL, RUN_EMAIL_EXTRACTION])
      );
      return {
        type: RUN_EMAIL_EXTRACTION,
        payload: {},
      };
    });
    it('gets client context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));
      return {
        query: jest.fn().mockImplementation(() => {
          const error = new Error();
          (error as any).status = HttpStatus.INTERNAL_SERVER_ERROR;
          throw error;
        }),
        url: () => 'url',
        config: { masterKey: 'masterKey' },
      };
    });
    it('gets notification manager context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));
      return notificationManager;
    });
    it('gets query settings from state', (result) => {
      expect(result).toEqual(select(getQuerySettings));
    });
    it('hides email extraction modal', (result) => {
      expect(result).toEqual(put(hideEmailExtractionModal()));
    });
    it('shows internal server error notification', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'notifications.email_extraction_error',
        showDismissButton: true,
        autoDismiss: false,
      });
    });
  });

  describe('Scenario 3: User failed to extract to email due to incorrect query settings', () => {
    const it = sagaHelper(extractToEmailFlow());
    const notificationManager = {
      showNotification: jest.fn(),
    };
    const errorBody = 'your request is missing required field';
    it('shows email extraction modal', (result) => {
      expect(result).toEqual(put(showEmailExtractionModal()));
    });
    it('waits for user input', (result) => {
      expect(result).toEqual(
        take([HIDE_EMAIL_EXTRACTION_MODAL, RUN_EMAIL_EXTRACTION])
      );
      return {
        type: RUN_EMAIL_EXTRACTION,
        payload: {},
      };
    });
    it('gets client context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));
      return {
        query: jest.fn().mockImplementation(() => {
          const error = new Error('message');
          (error as any).body = errorBody;
          throw error;
        }),
        url: () => 'url',
        config: { masterKey: 'masterKey' },
      };
    });
    it('gets notification manager context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));
      return notificationManager;
    });
    it('gets query settings from state', (result) => {
      expect(result).toEqual(select(getQuerySettings));
    });
    it('hides email extraction modal', (result) => {
      expect(result).toEqual(put(hideEmailExtractionModal()));
    });
    it('shows email extraction error notification', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        type: 'error',
        message: errorBody,
        translateMessage: false,
        autoDismiss: true,
      });
    });
  });
});
