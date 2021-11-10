import { getContext } from 'redux-saga/effects';
import { UPDATE_VISUALIZATION_TYPE } from '@keen.io/query-creator';
import { PUBSUB_CONTEXT } from '../../../constants';
import { updateVisualizationType as updateVisualizationTypeAction } from '../actions';
export function* updateVisualizationType({
  payload,
}: ReturnType<typeof updateVisualizationTypeAction>) {
  const { type } = payload;
  const pubsub = yield getContext(PUBSUB_CONTEXT);
  yield pubsub.publish(UPDATE_VISUALIZATION_TYPE, { type });
}
