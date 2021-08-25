import { getContext, put } from 'redux-saga/effects';
import { NEW_QUERY_EVENT, PUBSUB_CONTEXT } from '../../../constants';
import { queriesActions } from '../../queries';

export function* clearQuery() {
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(NEW_QUERY_EVENT);
  yield put(queriesActions.resetQueryResults());
}
