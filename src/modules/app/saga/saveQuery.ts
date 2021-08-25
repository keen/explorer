import { saveQuery as saveQueryAction } from '../actions';
import { put, select } from 'redux-saga/effects';
import { getQuerySettings, queriesActions } from '../../queries';
import { getVisualization } from '../selectors';
import { setVisualization as setVisualizationUtil } from '../../../utils';

export function* saveQuery({ payload }: ReturnType<typeof saveQueryAction>) {
  const { displayName, refreshRate, tags, name } = payload;

  const query = yield select(getQuerySettings);
  const visualizationFromState = yield select(getVisualization);
  const visualization = setVisualizationUtil(query, visualizationFromState);

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
