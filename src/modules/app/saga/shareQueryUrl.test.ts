/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { call, getContext, select } from 'redux-saga/effects';
import { copyToClipboard } from '@keen.io/charts-utils';
import { shareQueryUrl as shareQueryUrlFlow } from './shareQueryUrl';
import { getQuerySettings } from '../../queries';
import { savedQuerySelectors } from '../../savedQuery';
import { getVisualization } from '../selectors';
import { b64EncodeUnicode, getLocationUrl } from '../utils';
import { URL_STATE } from '../constants';
import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';

jest.mock('@keen.io/charts-utils', () => {
  return {
    copyToClipboard: jest.fn(),
  };
});

describe('shareQueryUrl()', () => {
  const test = sagaHelper(shareQueryUrlFlow());
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
  const stateToPersist = 'persisted-state';
  const url = `${getLocationUrl()}?${URL_STATE}=${stateToPersist}`;
  const notificationManager = {
    showNotification: jest.fn(),
  };

  test('select saved query', (result) => {
    expect(result).toEqual(select(savedQuerySelectors.getSavedQuery));
    return savedQuery;
  });

  test('get query settings', (result) => {
    expect(result).toEqual(select(getQuerySettings));
    return querySettings;
  });

  test('get visualization', (result) => {
    expect(result).toEqual(select(getVisualization));
    return visualization;
  });

  test('get the notification manager from context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));

    return notificationManager;
  });

  test('encode state', (result) => {
    expect(result).toEqual(
      call(
        b64EncodeUnicode,
        JSON.stringify({
          savedQuery,
          visualization,
          query: querySettings,
        })
      )
    );
    return stateToPersist;
  });

  test('copy url to the clipboard', () => {
    expect(copyToClipboard).toHaveBeenCalledWith(url);
  });

  test('shows share query success notification', () => {
    expect(notificationManager.showNotification).toHaveBeenCalledWith({
      type: 'success',
      message: 'notifications.share_query_success',
      autoDismiss: true,
    });
  });
});
