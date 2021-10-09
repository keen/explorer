import { call, put, take } from 'redux-saga/effects';
import { resizeScreen } from '../actions';
import { createScreenResizeChannel } from '../utils';

export function* watchScreenResize() {
  const channel = yield call(createScreenResizeChannel);
  try {
    while (true) {
      const { width, height } = yield take(channel);
      yield put(resizeScreen(width, height));
    }
  } catch (err) {
    console.error(err);
  }
}
