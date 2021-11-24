import { put, select } from 'redux-saga/effects';
import { getQuerySettings, queriesActions } from '../../queries';
import { setVisualization as setVisualizationSettings } from '../../../utils';
import { composeSavedQuery as composeSavedQueryAction } from '../actions';
import { getVisualization } from '../selectors';

export function* composeSavedQuery({
  payload,
}: ReturnType<typeof composeSavedQueryAction>) {
  const { displayName, refreshRate, tags, name } = payload;

  const query = yield select(getQuerySettings);
  const visualizationFromState = yield select(getVisualization);
  const visualization = setVisualizationSettings(query, visualizationFromState);

  const body = {
    query,
    metadata: {
      displayName,
      visualization,
      tags,
    },
    refreshRate: refreshRate * 60 * 60,
  };

  yield put(queriesActions.saveQuery({ name, body }));
}
