import { getContext, select, take, put } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';

import { queriesSlice } from '../reducer';
import { getQuerySettings, getSavedQueries } from '../selectors';

import { composeQuerySettings } from '../utils';
import { slugify } from '../../../utils/text';

import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';

import { CLONED_QUERY_DISPLAY_NAME, CLONED_QUERY_NAME } from '../constants';
import { savedQueryActions, savedQuerySelectors } from '../../savedQuery';
import { appSelectors, appActions } from '../../app';

/**
 * Flow responsible for creating clone saved query instance.
 *
 * @return void
 *
 */
export function* cloneSavedQuery() {
  const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
  const querySettings = yield select(getQuerySettings);
  const savedQuery = yield select(savedQuerySelectors.getSavedQuery);
  const view = yield select(appSelectors.getViewMode);

  const displayName = `${savedQuery.displayName} ${CLONED_QUERY_DISPLAY_NAME}`;
  const isCloneInstance = savedQuery.name.includes(CLONED_QUERY_NAME);

  let name: string;
  if (isCloneInstance) {
    name = `${slugify(savedQuery.displayName)}-${uuid()}`;
  } else {
    name = `${savedQuery.name}${CLONED_QUERY_NAME}-${uuid()}`;
  }

  const refreshRate = 0;

  const clonedSavedQuery = {
    ...savedQuery,
    cached: false,
    exists: false,
    isCloned: true,
    displayName,
    name,
    refreshRate,
  };

  if (view === 'browser') {
    yield put(appActions.setViewMode({ view: 'editor' }));
    yield take(appActions.queryEditorMounted.type);
    yield put(appActions.updateQueryCreator(querySettings));
    yield put(
      queriesSlice.actions.setQuerySettings({ settings: querySettings })
    );
    yield put(savedQueryActions.updateSavedQuery(clonedSavedQuery));
  }

  if (view === 'editor') {
    yield put(savedQueryActions.updateSavedQuery(clonedSavedQuery));
  }

  yield notificationManager.showNotification({
    type: 'success',
    message: 'notifications.clone_query_success',
  });

  const savedQueries = yield select(getSavedQueries);
  const { visualization, tags } = savedQueries.find(
    ({ name }) => name === savedQuery.name
  );
  const { analysis_type: analysisType, ...rest } = querySettings;
  const queryToTransform = { analysisType, ...rest };
  const body = {
    query: composeQuerySettings(queryToTransform),
    metadata: {
      displayName,
      visualization,
      tags,
    },
    refreshRate,
  };

  yield put(queriesSlice.actions.saveQuery({ name, body }));
  yield put(savedQueryActions.resetConnectedDashboards());
}
