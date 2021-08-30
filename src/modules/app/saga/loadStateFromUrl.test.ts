/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { call, getContext, put, select, take } from 'redux-saga/effects';

import { appActions } from '../index';
import { savedQueryActions } from '../../savedQuery';
import { getViewMode } from '../selectors';
import { queriesActions } from '../../queries';
import { loadStateFromUrl as loadStateFromUrlFlow } from './loadStateFromUrl';
import { selectFirstSavedQuery } from './selectFirstSavedQuery';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';

beforeEach(() => {
  jest.resetModules();
});

describe('loadStateFromUrl()', () => {
  describe('Scenario 1: Error when loading state from url in browser mode', () => {
    const test = sagaHelper(loadStateFromUrlFlow());

    const notificationManager = {
      showNotification: jest.fn(),
    };
    const viewMode = 'browser';

    test('check that app notifications has been mounted', (result) => {
      expect(result).toEqual(take(appActions.notificationsMounted.type));
    });

    test('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return notificationManager;
    });

    test('show notification error', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'notifications.load_share_query_error',
        showDismissButton: true,
        autoDismiss: false,
      });
    });

    test('select view mode', (result) => {
      expect(result).toEqual(select(getViewMode));
      return viewMode;
    });

    test('wait for getting a saved query', (result) => {
      expect(result).toEqual(take(queriesActions.getSavedQueriesSuccess.type));
    });

    test('selects first saved query', (result) => {
      expect(result).toEqual(call(selectFirstSavedQuery));
    });
  });

  describe('Scenario 2: Error when loading state from url in editor mode', () => {
    const test = sagaHelper(loadStateFromUrlFlow());

    const notificationManager = {
      showNotification: jest.fn(),
    };
    const viewMode = 'editor';

    test('check that app notifications has been mounted', (result) => {
      expect(result).toEqual(take(appActions.notificationsMounted.type));
    });

    test('get the notification manager from context', (result) => {
      expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

      return notificationManager;
    });

    test('show notification error', () => {
      expect(notificationManager.showNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'notifications.load_share_query_error',
        showDismissButton: true,
        autoDismiss: false,
      });
    });

    test('select view mode', (result) => {
      expect(result).toEqual(select(getViewMode));
      return viewMode;
    });

    test('resets saved query', (result) => {
      expect(result).toEqual(put(savedQueryActions.resetSavedQuery()));
    });
  });

  describe.skip('Scenario 3: State is successfully loaded from the url', () => {
    jest.doMock('../utils', () => {
      return {
        b64DecodeUnicode: () =>
          '{"savedQuery":{"name":"@savedQuery","displayName":"Purchases","tags":[],"isCloned":false,"cached":false,"refreshRate":0,"exists":true},"query":{"analysis_type":"funnel","steps":[],"timezone":null,"timeframe":null},"visualization":"metric"}',
      };
    });

    const savedQuery = {
      name: '@savedQuery',
      displayName: 'Purchases',
      tags: [],
      isCloned: false,
      cached: false,
      refreshRate: 0,
      exists: true,
    };
    const querySettings = {
      analysis_type: 'funnel',
      steps: [],
      timezone: null,
      timeframe: null,
    };
    const visualization = 'metric';

    // const notificationManager = {
    //   showNotification: jest.fn(),
    // };

    jest
      .spyOn(URLSearchParams.prototype, 'get')
      .mockImplementation(
        () =>
          `?query=${JSON.stringify(querySettings)}&savedQuery=${JSON.stringify(
            savedQuery
          )}&visualization=${JSON.stringify(visualization)}`
      );

    const test = sagaHelper(loadStateFromUrlFlow());

    test('updates saved query', (result) => {
      expect(result).toEqual(
        put(savedQueryActions.updateSavedQuery(savedQuery))
      );
    });
  });
});
