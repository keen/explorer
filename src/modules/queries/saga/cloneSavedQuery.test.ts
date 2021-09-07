/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { getContext, select, take, put } from 'redux-saga/effects';

import { cloneSavedQuery } from './cloneSavedQuery';

import { queriesSlice } from '../reducer';
import { getQuerySettings, getSavedQueries } from '../selectors';

import {
  getViewMode,
  setViewMode,
  updateQueryCreator,
  QUERY_EDITOR_MOUNTED,
} from '../../../modules/app';

import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';

import { CLONED_QUERY_DISPLAY_NAME, CLONED_QUERY_NAME } from '../constants';
import { savedQueryActions, savedQuerySelectors } from '../../savedQuery';

const uniqueQueryId = '@query/01';
jest.mock('uuid', () => {
  return {
    v4: () => uniqueQueryId,
  };
});

describe('Scenario 1: User cloned saved query from browser view', () => {
  const test = sagaHelper(cloneSavedQuery());
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
    name: `${savedQuery.name}${CLONED_QUERY_NAME}-${uniqueQueryId}`,
    exists: false,
    isCloned: true,
  };

  const querySettings: any = {
    analysis_type: 'funnel',
    steps: [],
    timezone: 'UTC',
    timeframe: 'this_14_weeks',
  };

  const query = {
    analysisType: 'funnel',
    steps: [],
    timezone: 'UTC',
    timeframe: 'this_14_weeks',
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
    expect(result).toEqual(select(savedQuerySelectors.getSavedQuery));
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
    expect(result).toEqual(
      put(queriesSlice.actions.setQuerySettings({ settings: querySettings }))
    );
  });

  test('updates saved query', (result) => {
    expect(result).toEqual(
      put(savedQueryActions.updateSavedQuery(clonedSavedQuery))
    );
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

    expect(result).toEqual(
      put(queriesSlice.actions.saveQuery({ name: clonedSavedQuery.name, body }))
    );
  });

  test('resets dashboards connections', (result) => {
    expect(result).toEqual(put(savedQueryActions.resetConnectedDashboards()));
  });
});

describe('Scenario 2: User cloned query from editor view', () => {
  const test = sagaHelper(cloneSavedQuery());
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
    name: `${savedQuery.name}${CLONED_QUERY_NAME}-${uniqueQueryId}`,
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
    analysisType: 'funnel',
    steps: [],
    timeframe: null,
    timezone: 'UTC',
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
    expect(result).toEqual(select(savedQuerySelectors.getSavedQuery));
    return savedQuery;
  });

  test('get application view from state', (result) => {
    expect(result).toEqual(select(getViewMode));
    return 'editor';
  });

  test('updates saved query', (result) => {
    expect(result).toEqual(
      put(savedQueryActions.updateSavedQuery(clonedSavedQuery))
    );
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

    expect(result).toEqual(
      put(queriesSlice.actions.saveQuery({ name: clonedSavedQuery.name, body }))
    );
  });

  test('resets dashboards connections', (result) => {
    expect(result).toEqual(put(savedQueryActions.resetConnectedDashboards()));
  });
});

describe('Scenario 3: User duplicates already cloned instance', () => {
  const test = sagaHelper(cloneSavedQuery());
  const notificationManager = {
    showNotification: jest.fn(),
  };

  const savedQuery = {
    name: `purchases${CLONED_QUERY_NAME}`,
    displayName: 'Purchases',
    tags: [],
    isCloned: false,
    cached: false,
    refreshRate: 0,
    exists: true,
  };

  const clonedSavedQuery = {
    ...savedQuery,
    displayName: `${savedQuery.displayName} ${CLONED_QUERY_DISPLAY_NAME}`,
    name: `purchases-${uniqueQueryId}`,
    exists: false,
    isCloned: true,
  };

  const querySettings = {
    analysis_type: 'funnel',
    steps: [],
    timezone: null,
    timeframe: null,
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
    expect(result).toEqual(select(savedQuerySelectors.getSavedQuery));
    return savedQuery;
  });

  test('get application view from state', (result) => {
    expect(result).toEqual(select(getViewMode));
    return 'editor';
  });

  test('updates saved query', (result) => {
    expect(result).toEqual(
      put(savedQueryActions.updateSavedQuery(clonedSavedQuery))
    );
  });
});
