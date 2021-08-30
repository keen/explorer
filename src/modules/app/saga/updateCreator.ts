import { getContext } from 'redux-saga/effects';
import { SET_QUERY_EVENT } from '@keen.io/query-creator';

import { updateQueryCreator } from '../actions';
import { PUBSUB_CONTEXT } from '../../../constants';

export function* updateCreator({
  payload,
}: ReturnType<typeof updateQueryCreator>) {
  const { query } = payload;
  const pubsub = yield getContext(PUBSUB_CONTEXT);

  yield pubsub.publish(SET_QUERY_EVENT, { query });
}
