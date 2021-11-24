import { put } from 'redux-saga/effects';

import { resizeScreen } from '../actions';
import { appActions } from '../index';

export function* resizeBrowserScreen({
  payload,
}: ReturnType<typeof resizeScreen>) {
  const { width, height } = payload;
  yield put(appActions.setScreenDimension({ width, height }));
}
