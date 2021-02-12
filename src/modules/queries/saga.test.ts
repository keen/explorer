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
  cloneSavedQuery as cloneSavedQueryFlow,
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
  setQuerySettings,
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
  QUERY_EDITOR_MOUNTED,
  updateQueryCreator,
} from '../../modules/app';
import { getSavedQuery, updateSavedQuery } from '../../modules/savedQuery';

import {
  CLONED_QUERY_DISPLAY_NAME,
  CLONED_QUERY_NAME,
  ERRORS,
  RUN_EMAIL_EXTRACTION,
} from './constants';
import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../constants';
import { getQuerySettings, getSavedQueries } from './selectors';

fetchMock.mockResponse(() => Promise.resolve(JSON.stringify({})));

describe('checkOrganizationLimits()', () => {
  describe('Scenario 1: User exceed organization limits', () => {
    const test = sagaHelper(checkOrganizationLimitsFlow());

    test('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      return {
        url: () => 'url',
        config: { masterKey: 'masterKey' },
      };
    });

    test('calls the API to check organization limits', () => {
      const response = {
        cached_queries: { limited: true, limit: 5, current_usage: 10 },
      };
      return response;
    });

    test('notfies user about exceed cache queries organization limit', (result) => {
      expect(result).toEqual(put(setCacheQueryLimitExceed(true)));
    });

    test('setup cache queries limit', (result) => {
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
    const test = sagaHelper(saveQueryFlow(action));

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
        url: () => 'url',
        config: { masterKey: 'masterKey' },
      };
    });

    test('get settings modal visibility from state', (result) => {
      expect(result).toEqual(select(getQuerySettingsModalVisibility));
      return true;
    });

    test('calls API to save query resource', () => {
      return {
        success: true,
      };
    });

    test('hide query settings modal', (result) => {
      expect(result).toEqual(put(hideQuerySettingsModal()));
    });

    test('dispatch save query success action', (result) => {
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
    const test = sagaHelper(runQueryFlow(action));

    test('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      return {
        query: jest.fn(),
      };
    });

    test('calls API to run query', () => {
      return { analysis_type: 'count' };
    });

    test('dispatch run query success action', (result) => {
      expect(result).toEqual(put(runQuerySuccess({ analysis_type: 'count' })));
    });
  });

  describe('Scenario 2: User exceed run query limits', () => {
    const query = {};
    const action = runQuery(query) as ReturnType<typeof runQuery>;
    const test = sagaHelper(runQueryFlow(action));

    test('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      const error = new Error('message');
      (error as any).error_code = ERRORS.TOO_MANY_QUERIES;
      return error;
    });

    test('dispatch run query error action', (result) => {
      expect(result).toEqual(put(runQueryError(new Error('message') as any)));
    });

    test('notifies user about exceeding query perform limits', (result) => {
      expect(result).toEqual(put(setQueryLimitReached(true)));
    });
  });

  describe('Scenario 3: User failed to run query due to API internal error', () => {
    const query = {};
    const action = runQuery(query) as ReturnType<typeof runQuery>;
    const test = sagaHelper(runQueryFlow(action));

    test('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      const error = new Error('message');
      (error as any).error_code = HttpStatus.INTERNAL_SERVER_ERROR;
      return error;
    });

    test('dispatch run query error action', (result) => {
      expect(result).toEqual(put(runQueryError(new Error('message') as any)));
    });

    test('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));
    });
  });
});

describe('deleteQuery()', () => {
  describe('Scenario 1: User successfully delete query', () => {
    const action = deleteQuery('purchases') as ReturnType<typeof deleteQuery>;
    const test = sagaHelper(deleteQueryFlow(action));

    test('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return {
        showNotification: jest.fn(),
      };
    });

    test('shows confirmation modal', (result) => {
      expect(result).toEqual(
        put(showConfirmation('delete', { queryName: 'purchases' }))
      );
    });

    test('waits for user confirmation', (result) => {
      expect(result).toEqual(take([ACCEPT_CONFIRMATION, HIDE_CONFIRMATION]));

      return {
        type: ACCEPT_CONFIRMATION,
      };
    });

    test('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      return {
        url: jest.fn(),
        masterKey: jest.fn(),
        del: jest.fn().mockReturnThis(),
        auth: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
    });

    test('calls API to delete query resource', (keenClient) => {
      expect(keenClient.del).toHaveBeenCalled();
    });

    test('get application view from state', (result) => {
      expect(result).toEqual(select(getViewMode));
      return 'editor';
    });

    test('changes the application view', (result) => {
      expect(result).toEqual(put(setViewMode('browser')));
    });

    test('resets query results', (result) => {
      expect(result).toEqual(put(resetQueryResults()));
    });

    test('dispatch delete query success action', (result) => {
      expect(result).toEqual(put(deleteQuerySuccess('purchases')));
    });

    test('selects first query', (result) => {
      expect(result).toEqual(put(selectFirstSavedQuery()));
    });
  });

  describe('Scenario 2: User failed to delete query due to API internal error', () => {
    const action = deleteQuery('purchases') as ReturnType<typeof deleteQuery>;
    const test = sagaHelper(deleteQueryFlow(action));

    test('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return {
        showNotification: jest.fn(),
      };
    });

    test('shows confirmation modal', (result) => {
      expect(result).toEqual(
        put(showConfirmation('delete', { queryName: 'purchases' }))
      );
    });

    test('waits for user confirmation', (result) => {
      expect(result).toEqual(take([ACCEPT_CONFIRMATION, HIDE_CONFIRMATION]));

      return {
        type: ACCEPT_CONFIRMATION,
      };
    });

    test('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      const error = new Error('message');
      (error as any).status = HttpStatus.INTERNAL_SERVER_ERROR;
      return error;
    });

    test('shows the notification', (result) => {
      expect(result).toBeUndefined();
    });

    test('dispatch delete query error action', (result) => {
      expect(result).toEqual(put(deleteQueryError(new Error('message'))));
    });
  });

  describe('Scenario 3: User cancel delete query action', () => {
    const action = deleteQuery('purchases') as ReturnType<typeof deleteQuery>;
    const test = sagaHelper(deleteQueryFlow(action));

    test('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return {
        showNotification: jest.fn(),
      };
    });

    test('shows confirmation modal', (result) => {
      expect(result).toEqual(
        put(showConfirmation('delete', { queryName: 'purchases' }))
      );
    });

    test('waits for user confirmation', (result) => {
      expect(result).toEqual(take([ACCEPT_CONFIRMATION, HIDE_CONFIRMATION]));

      return {
        type: HIDE_CONFIRMATION,
      };
    });

    test('terminates the saga flow', (result) => {
      expect(result).toBeUndefined();
    });
  });
});

describe('extractToEmail()', () => {
  describe('Scenario 1: User successfully extracts to email', () => {
    const test = sagaHelper(extractToEmailFlow());
    const notificationManager = {
      showNotification: jest.fn(),
    };
    test('shows email extraction modal', (result) => {
      expect(result).toEqual(put(showEmailExtractionModal()));
    });
    test('waits for user input', (result) => {
      expect(result).toEqual(
        take([HIDE_EMAIL_EXTRACTION_MODAL, RUN_EMAIL_EXTRACTION])
      );
      return {
        type: RUN_EMAIL_EXTRACTION,
        payload: {},
      };
    });
    test('gets client context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));
      return {
        query: jest.fn(),
        url: () => 'url',
        config: { masterKey: 'masterKey' },
      };
    });
    test('gets notification manager context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));
      return notificationManager;
    });
    test('gets query settings from state', (result) => {
      expect(result).toEqual(select(getQuerySettings));
    });
    test('hides email extraction modal', (result) => {
      expect(result).toEqual(put(hideEmailExtractionModal()));
    });
    test('calls API to extract to email', () => {
      return { success: true };
    });
    test('shows email extraction success notification', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        autoDismiss: true,
        message: 'notifications.prepare_email_extraction',
        type: 'info',
      });
    });
  });

  describe('Scenario 2: User failed to extract to email due to internal server error', () => {
    const test = sagaHelper(extractToEmailFlow());
    const notificationManager = {
      showNotification: jest.fn(),
    };

    test('shows email extraction modal', (result) => {
      expect(result).toEqual(put(showEmailExtractionModal()));
    });
    test('waits for user input', (result) => {
      expect(result).toEqual(
        take([HIDE_EMAIL_EXTRACTION_MODAL, RUN_EMAIL_EXTRACTION])
      );
      return {
        type: RUN_EMAIL_EXTRACTION,
        payload: {},
      };
    });
    test('gets client context', (result) => {
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
    test('gets notification manager context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));
      return notificationManager;
    });
    test('gets query settings from state', (result) => {
      expect(result).toEqual(select(getQuerySettings));
    });
    test('hides email extraction modal', (result) => {
      expect(result).toEqual(put(hideEmailExtractionModal()));
    });
    test('shows internal server error notification', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'notifications.email_extraction_error',
        showDismissButton: true,
        autoDismiss: false,
      });
    });
  });

  describe('Scenario 3: User failed to extract to email due to incorrect query settings', () => {
    const test = sagaHelper(extractToEmailFlow());
    const notificationManager = {
      showNotification: jest.fn(),
    };
    const errorBody = 'your request is missing required field';
    test('shows email extraction modal', (result) => {
      expect(result).toEqual(put(showEmailExtractionModal()));
    });
    test('waits for user input', (result) => {
      expect(result).toEqual(
        take([HIDE_EMAIL_EXTRACTION_MODAL, RUN_EMAIL_EXTRACTION])
      );
      return {
        type: RUN_EMAIL_EXTRACTION,
        payload: {},
      };
    });
    test('gets client context', (result) => {
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
    test('gets notification manager context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));
      return notificationManager;
    });
    test('gets query settings from state', (result) => {
      expect(result).toEqual(select(getQuerySettings));
    });
    test('hides email extraction modal', (result) => {
      expect(result).toEqual(put(hideEmailExtractionModal()));
    });
    test('shows email extraction error notification', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        type: 'error',
        message: errorBody,
        translateMessage: false,
        autoDismiss: true,
      });
    });
  });
});

describe('cloneSavedQuery()', () => {
  describe('Scenario 1: User cloned saved query from browser view', () => {
    const test = sagaHelper(cloneSavedQueryFlow());
    const notificationManager = {
      showNotification: jest.fn(),
    };
    const savedQuery = {
      name: 'query',
      displayName: 'query',
      tags: [],
      isCloned: false,
      cached: false,
      refreshRate: 0,
      exists: true,
    };

    const clonedSavedQuery = {
      ...savedQuery,
      displayName: `${savedQuery.displayName} ${CLONED_QUERY_DISPLAY_NAME}`,
      name: `${savedQuery.name}${CLONED_QUERY_NAME}`,
      exists: false,
      isCloned: true,
    };

    const querySettings = {
      analysis_type: 'funnel',
      steps: [],
      timezone: 'UTC',
      timeframe: 'this_14_weeks',
    };

    const query = {
      analysis_type: 'funnel',
      steps: [],
    };

    test('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return notificationManager;
    });

    test('gets query settings from state', (result) => {
      expect(result).toEqual(select(getQuerySettings));
      return querySettings;
    });

    test('gets saved query settings from state', (result) => {
      expect(result).toEqual(select(getSavedQuery));
      return savedQuery;
    });

    test('get application view from state', (result) => {
      expect(result).toEqual(select(getViewMode));
      return 'browser';
    });

    test('changes the application view', (result) => {
      expect(result).toEqual(put(setViewMode('editor')));
    });

    test('waits for user confirmation', (result) => {
      expect(result).toEqual(take(QUERY_EDITOR_MOUNTED));
      return {
        type: QUERY_EDITOR_MOUNTED,
      };
    });

    test('updates query creator settings', (result) => {
      expect(result).toEqual(put(updateQueryCreator(querySettings)));
    });

    test('sets query settings', (result) => {
      expect(result).toEqual(put(setQuerySettings(querySettings)));
    });

    test('updates saved query', (result) => {
      expect(result).toEqual(put(updateSavedQuery(clonedSavedQuery)));
    });

    test('shows clone query success notification', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        type: 'success',
        message: 'notifications.clone_query_success',
      });
    });

    test('selects saved queries', (result) => {
      expect(result).toEqual(select(getSavedQueries));
      return [
        {
          ...savedQuery,
          visualization: 'funnel',
          query,
        },
      ];
    });

    test('saves cloned saved query', (result) => {
      const { tags, displayName } = clonedSavedQuery;
      const body = {
        metadata: {
          displayName,
          tags,
          visualization: 'funnel',
        },
        query,
        refreshRate: 0,
      };
      expect(result).toEqual(put(saveQuery(clonedSavedQuery.name, body)));
    });
  });

  describe('Scenario 2: User cloned query from editor view', () => {
    const test = sagaHelper(cloneSavedQueryFlow());
    const notificationManager = {
      showNotification: jest.fn(),
    };
    const savedQuery = {
      name: 'query',
      displayName: 'query',
      tags: [],
      isCloned: false,
      cached: false,
      refreshRate: 0,
      exists: true,
    };

    const clonedSavedQuery = {
      ...savedQuery,
      displayName: `${savedQuery.displayName} ${CLONED_QUERY_DISPLAY_NAME}`,
      name: `${savedQuery.name}${CLONED_QUERY_NAME}`,
      exists: false,
      isCloned: true,
    };

    const querySettings = {
      analysis_type: 'funnel',
      steps: [],
      timezone: null,
      timeframe: null,
    };

    const query = {
      analysis_type: 'funnel',
      steps: [],
    };

    test('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return notificationManager;
    });

    test('gets query settings from state', (result) => {
      expect(result).toEqual(select(getQuerySettings));
      return querySettings;
    });

    test('gets saved query settings from state', (result) => {
      expect(result).toEqual(select(getSavedQuery));
      return savedQuery;
    });

    test('get application view from state', (result) => {
      expect(result).toEqual(select(getViewMode));
      return 'editor';
    });

    test('updates saved query', (result) => {
      expect(result).toEqual(put(updateSavedQuery(clonedSavedQuery)));
    });

    test('shows clone query success notification', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        type: 'success',
        message: 'notifications.clone_query_success',
      });
    });

    test('selects saved queries', (result) => {
      expect(result).toEqual(select(getSavedQueries));
      return [
        {
          ...savedQuery,
          visualization: 'funnel',
          query,
        },
      ];
    });

    test('saves cloned saved query', (result) => {
      const { tags, displayName } = clonedSavedQuery;
      const body = {
        metadata: {
          displayName,
          tags,
          visualization: 'funnel',
        },
        query,
        refreshRate: 0,
      };
      expect(result).toEqual(put(saveQuery(clonedSavedQuery.name, body)));
    });
  });
});
