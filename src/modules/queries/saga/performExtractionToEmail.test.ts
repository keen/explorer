import sagaHelper from 'redux-saga-testing';
import { getContext, select, take, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { runEmailExtraction } from '../actions';
import { performExtractionToEmail } from './performExtractionToEmail';

import { getQuerySettings } from '../selectors';

import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../../constants';
import { appActions } from '../../app';

describe('Scenario 1: User successfully performs extraction to email', () => {
  const test = sagaHelper(performExtractionToEmail());
  const notificationManager = {
    showNotification: jest.fn(),
  };

  test('shows email extraction modal', (result) => {
    expect(result).toEqual(put(appActions.showEmailExtractionModal()));
  });

  test('waits for user input', (result) => {
    expect(result).toEqual(
      take([appActions.hideEmailExtractionModal.type, runEmailExtraction.type])
    );

    return runEmailExtraction('email@keen.io', 100, 'application/json');
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
    expect(result).toEqual(put(appActions.hideEmailExtractionModal()));
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
  const test = sagaHelper(performExtractionToEmail());
  const notificationManager = {
    showNotification: jest.fn(),
  };

  test('shows email extraction modal', (result) => {
    expect(result).toEqual(put(appActions.showEmailExtractionModal()));
  });

  test('waits for user input', (result) => {
    expect(result).toEqual(
      take([appActions.hideEmailExtractionModal.type, runEmailExtraction.type])
    );

    return runEmailExtraction('email@keen.io', 100, 'application/json');
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
    expect(result).toEqual(put(appActions.hideEmailExtractionModal()));
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
  const test = sagaHelper(performExtractionToEmail());
  const notificationManager = {
    showNotification: jest.fn(),
  };
  const errorBody = 'your request is missing required field';

  test('shows email extraction modal', (result) => {
    expect(result).toEqual(put(appActions.showEmailExtractionModal()));
  });

  test('waits for user input', (result) => {
    expect(result).toEqual(
      take([appActions.hideEmailExtractionModal.type, runEmailExtraction.type])
    );

    return runEmailExtraction('email@keen.io', 100, 'application/json');
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
    expect(result).toEqual(put(appActions.hideEmailExtractionModal()));
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
