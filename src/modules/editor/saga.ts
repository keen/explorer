import { takeLatest, take, put, select, getContext } from 'redux-saga/effects';
import { Query } from '@keen.io/query';
import { SET_CHART_SETTINGS } from '@keen.io/query-creator';

import { setQueryCreatorChartSettings } from './actions';
import { EditorSection } from './types';

import { getQuerySettings, queriesActions } from '../queries';

import { PUBSUB_CONTEXT } from '../../constants';
import { appActions, appSelectors } from '../app';
import { editorActions } from './index';

/**
 * Restores query and chart settings in creator
 *
 * @param editorSection - Current active section in editor
 * @return void
 *
 */
export function* handleEditorSectionChange({
  payload,
}: ReturnType<typeof editorActions.setActiveEditorTab>) {
  if (payload === EditorSection.QUERY) {
    const { chartSettings } = yield select(appSelectors.getVisualization);
    const query: Query = yield select(getQuerySettings);
    const action = yield take([
      appActions.createNewQuery.type,
      appActions.queryEditorMounted.type,
    ]);
    if (action.type === appActions.createNewQuery.type) {
      yield put(queriesActions.clearQuerySettings());
    }
    if (action.type === appActions.queryEditorMounted.type) {
      yield put(appActions.updateQueryCreator(query));
      yield put(setQueryCreatorChartSettings(chartSettings));
    }
  }
}

/**
 * Set event streams used on dashboard
 *
 * @param dashboardId - Dashboard identifer
 * @return void
 *
 */
export function* updateChartSettingsInQueryCreator({
  payload,
}: ReturnType<typeof setQueryCreatorChartSettings>) {
  const { chartSettings } = payload;
  if (chartSettings?.stepLabels && chartSettings.stepLabels.length) {
    const { stepLabels } = chartSettings;
    const pubsub = yield getContext(PUBSUB_CONTEXT);
    yield pubsub.publish(SET_CHART_SETTINGS, { chartSettings: { stepLabels } });
  }
}

export function* editorSaga() {
  yield takeLatest(
    setQueryCreatorChartSettings.type,
    updateChartSettingsInQueryCreator
  );
  yield takeLatest(
    editorActions.setActiveEditorTab.type,
    handleEditorSectionChange
  );
}
