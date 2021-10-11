/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { put, take, getContext } from 'redux-saga/effects';
import { PickerWidgets } from '@keen.io/widget-picker';

import {
  queryEditorMounted,
  setVisualization,
  updateQueryCreator,
  notificationsMounted,
} from '../actions';
import { loadSharedQuery } from './loadSharedQuery';

import { savedQueryActions } from '../../savedQuery';
import { b64EncodeUnicode } from '../utils';

import { QUERY_EDITOR_MOUNTED, NOTIFICATIONS_MOUNTED } from '../constants';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';

describe('Scenario 1: Successfully serializes query from URL state', () => {
  const query = {
    analysis_type: 'count',
    event_collection: 'purchases',
  };

  const visualization = {
    type: 'bar',
    chartSettings: {
      stackMode: 'percent',
    },
    widgetSettings: {},
  };

  const savedQuery = {
    displayName: 'Purchases last month',
  };

  const serializedQuery = b64EncodeUnicode(
    JSON.stringify({
      savedQuery,
      visualization,
      query,
    })
  );

  const test = sagaHelper(loadSharedQuery(serializedQuery));

  test('updates saved query settings', (result) => {
    expect(result).toEqual(put(savedQueryActions.updateSavedQuery(savedQuery)));
  });

  test('updates visualization', (result) => {
    const { type, chartSettings, widgetSettings } = visualization;

    expect(result).toEqual(
      put(
        setVisualization(type as PickerWidgets, chartSettings, widgetSettings)
      )
    );
  });

  test('wait for query creator mount event', (result) => {
    expect(result).toEqual(take(QUERY_EDITOR_MOUNTED));

    return queryEditorMounted();
  });

  test('updates query creator', (result) => {
    expect(result).toEqual(put(updateQueryCreator(query)));
  });
});

describe('Scenario 2: Error orrured during query deserialization from URL state', () => {
  const serializedQuery = '@invalid-state';
  const notificationManager = {
    showNotification: jest.fn(),
  };

  const test = sagaHelper(loadSharedQuery(serializedQuery));

  test('wait for notifications mount event', (result) => {
    expect(result).toEqual(take(NOTIFICATIONS_MOUNTED));

    return notificationsMounted();
  });

  test('get notification manager from context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

    return notificationManager;
  });

  test('shows error notification', () => {
    expect(notificationManager.showNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        showDismissButton: true,
        autoDismiss: false,
      })
    );
  });

  test('reset saved query settings', (result) => {
    expect(result).toEqual(put(savedQueryActions.resetSavedQuery()));
  });
});
