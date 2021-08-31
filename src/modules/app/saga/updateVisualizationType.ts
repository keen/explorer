import { getContext } from 'redux-saga/effects';
import { UPDATE_VISUALIZATION_TYPE } from '@keen.io/query-creator';

import { updateVisualizationType as updateVisualizationTypeAction } from '../actions';
import { PUBSUB_CONTEXT } from '../../../constants';

export function* updateVisualizationType({
  payload,
}: ReturnType<typeof updateVisualizationTypeAction>) {
  const { type } = payload;
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(UPDATE_VISUALIZATION_TYPE, { type });
}
