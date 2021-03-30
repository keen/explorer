import { takeLatest, take, put, select, getContext } from 'redux-saga/effects';
import { Query } from '@keen.io/query';
import { SET_CHART_SETTINGS } from '@keen.io/query-creator';

import { changeEditorSection, setQueryCreatorChartSettings } from './actions';
import { EditorSection } from './types';

import {
  getVisualization,
  updateQueryCreator,
  QUERY_EDITOR_MOUNTED,
} from '../app';
import { getQuerySettings } from '../queries';

import { PUBSUB_CONTEXT } from '../../constants';

/**
 * Restores query and chart settings in creator
 *
 * @param editorSection - Current active section in editor
 * @return void
 *
 */
export function* handleEditorSectionChange({
  payload,
}: ReturnType<typeof changeEditorSection>) {
  const { editorSection } = payload;

  if (editorSection === EditorSection.QUERY) {
    const { chartSettings } = yield select(getVisualization);
    const query: Query = yield select(getQuerySettings);

    yield take(QUERY_EDITOR_MOUNTED);
    yield put(updateQueryCreator(query));
    yield put(setQueryCreatorChartSettings(chartSettings));
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
  yield takeLatest(changeEditorSection.type, handleEditorSectionChange);
}
