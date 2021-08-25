import { getContext, put } from 'redux-saga/effects';
import { resetVisualization, setViewMode } from '../actions';
import { NEW_QUERY_EVENT, PUBSUB_CONTEXT } from '../../../constants';
import { queriesActions } from '../../queries';
import { savedQueryActions } from '../../savedQuery';

export function* createNewQuery() {
  yield put(setViewMode('editor'));
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(NEW_QUERY_EVENT);

  yield put(queriesActions.resetQueryResults());
  yield put(resetVisualization());
  yield put(savedQueryActions.resetSavedQuery());
}
