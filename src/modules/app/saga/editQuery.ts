import { getContext, put, select, take } from 'redux-saga/effects';
import { SET_CHART_SETTINGS } from '@keen.io/query-creator/dist';

import {
  editQuery as editQueryAction,
  updateChartSettings,
  updateQueryCreator,
} from '../actions';
import { getSavedQueries } from '../../queries';
import { PUBSUB_CONTEXT } from '../../../constants';
import { appActions } from '../index';

export function* editQuery({ payload }: ReturnType<typeof editQueryAction>) {
  yield put(appActions.setViewMode({ view: 'editor' }));
  yield take(appActions.queryEditorMounted.type);

  const savedQueries = yield select(getSavedQueries);
  const { query, visualization } = savedQueries.find(
    ({ name }) => name === payload.queryName
  );
  const { chartSettings } = visualization;
  if (chartSettings?.stepLabels && chartSettings.stepLabels.length) {
    const { stepLabels } = chartSettings;
    const pubsub = yield getContext(PUBSUB_CONTEXT);
    yield pubsub.publish(SET_CHART_SETTINGS, { chartSettings: { stepLabels } });
    yield put(updateChartSettings(chartSettings));
  }

  yield put(updateQueryCreator(query));
}
