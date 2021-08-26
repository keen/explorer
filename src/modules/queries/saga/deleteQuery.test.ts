/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { getContext, put, take, select } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { deleteQuery } from './deleteQuery';

import { deleteQuery as deleteQueryAction, deleteQueryError } from '../actions';

import { queriesSlice } from '../reducer';

import { appActions, appSelectors } from '../../../modules/app';

import {
  NOTIFICATION_MANAGER_CONTEXT,
  KEEN_CLIENT_CONTEXT,
  DASHBOARDS_API_CONTEXT,
} from '../../../constants';
import { savedQueryActions } from '../../savedQuery';

describe('Scenario 1: User successfully delete query', () => {
  const action = deleteQueryAction('purchases');
  const test = sagaHelper(deleteQuery(action));
  const queryName = 'purchases';

  test('get the notification manager from context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

    return {
      showNotification: jest.fn(),
    };
  });

  test('gets dashboards api', (result) => {
    expect(result).toEqual(getContext(DASHBOARDS_API_CONTEXT));
    return true;
  });

  test('shows confirmation modal', (result) => {
    expect(result).toEqual(
      put(
        appActions.showConfirmation({
          confirmAction: 'delete',
          meta: { queryName },
        })
      )
    );
  });

  test('gets connected dashboards', (result) => {
    expect(result).toEqual(
      put(savedQueryActions.getDashboardsConnection(queryName))
    );
  });

  test('waits for user confirmation', (result) => {
    expect(result).toEqual(
      take([
        appActions.acceptConfirmation.type,
        appActions.hideConfirmation.type,
      ])
    );

    return {
      type: appActions.acceptConfirmation.type,
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
    expect(result).toEqual(select(appSelectors.getViewMode));
    return 'editor';
  });

  test('changes the application view', (result) => {
    expect(result).toEqual(put(appActions.setViewMode({ view: 'browser' })));
  });

  test('resets query results', (result) => {
    expect(result).toEqual(put(queriesSlice.actions.resetQueryResults()));
  });

  test('dispatch delete query success action', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.deleteQuerySuccess({ queryName: 'purchases' }))
    );
  });

  test('selects first query', (result) => {
    expect(result).toEqual(put(appActions.selectFirstSavedQuery()));
  });
});

describe('Scenario 2: User failed to delete query due to API internal error', () => {
  const action = deleteQueryAction('purchases');
  const test = sagaHelper(deleteQuery(action));

  test('get the notification manager from context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

    return {
      showNotification: jest.fn(),
    };
  });

  test('gets dashboards api', (result) => {
    expect(result).toEqual(getContext(DASHBOARDS_API_CONTEXT));
    return false;
  });

  test('shows confirmation modal', (result) => {
    expect(result).toEqual(
      put(
        appActions.showConfirmation({
          confirmAction: 'delete',
          meta: { queryName: 'purchases' },
        })
      )
    );
  });

  test('waits for user confirmation', (result) => {
    expect(result).toEqual(
      take([
        appActions.acceptConfirmation.type,
        appActions.hideConfirmation.type,
      ])
    );

    return {
      type: appActions.acceptConfirmation.type,
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
  const action = deleteQueryAction('purchases');
  const test = sagaHelper(deleteQuery(action));

  test('get the notification manager from context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

    return {
      showNotification: jest.fn(),
    };
  });

  test('gets dashboards api', (result) => {
    expect(result).toEqual(getContext(DASHBOARDS_API_CONTEXT));
    return false;
  });

  test('shows confirmation modal', (result) => {
    expect(result).toEqual(
      put(
        appActions.showConfirmation({
          confirmAction: 'delete',
          meta: { queryName: 'purchases' },
        })
      )
    );
  });

  test('waits for user confirmation', (result) => {
    expect(result).toEqual(
      take([
        appActions.acceptConfirmation.type,
        appActions.hideConfirmation.type,
      ])
    );

    return {
      type: appActions.hideConfirmation.type,
    };
  });

  test('terminates the saga flow', (result) => {
    expect(result).toBeUndefined();
  });
});
