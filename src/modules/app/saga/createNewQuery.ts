import { getContext, put } from 'redux-saga/effects';
import { NEW_QUERY_EVENT, PUBSUB_CONTEXT } from '../../../constants';
import { savedQueryActions } from '../../savedQuery';
import { queriesActions } from '../../queries';
import { appActions } from '../index';

export function* createNewQuery() {
  yield put(savedQueryActions.resetSavedQuery());
  yield put(appActions.setViewMode({ view: 'editor' }));
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(NEW_QUERY_EVENT);

  yield put(queriesActions.resetQueryResults());
  yield put(appActions.resetVisualization());
}
