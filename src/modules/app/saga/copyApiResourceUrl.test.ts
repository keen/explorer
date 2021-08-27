/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { getContext, select } from 'redux-saga/effects';

import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';
import { getQuerySettings } from '../../queries';
import { appActions } from '../index';
import { copyApiResourceUrl as copyApiResourceUrlFlow } from './copyApiResourceUrl';

describe('copyApiResourceUrl()', () => {
  const config = {
    config: {
      protocol: 'http',
      host: 'HOST',
      projectId: 'PROJECT_ID',
      masterKey: 'MASTER_KEY',
    },
  };
  const query = {
    analysis_type: 'funnel',
  };

  const notificationManagerMock = {
    showNotification: jest.fn(),
  };
  const action = appActions.copyApiResourceUrl(config);

  const test = sagaHelper(copyApiResourceUrlFlow(action));

  test('get query settings', (result) => {
    expect(result).toEqual(select(getQuerySettings));
    return query;
  });

  test('get notification manager context', (result) => {
    expect(result).toEqual(getContext(NOTIFICATION_MANAGER_CONTEXT));
    return notificationManagerMock;
  });

  test('shows notification', () => {
    expect(notificationManagerMock.showNotification).toBeCalled();
  });
});
