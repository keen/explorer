import { put } from 'redux-saga/effects';
import { resizeScreen } from '../actions';
import { QUERY_AUTORUN_KEY } from '../constants';
import { appActions } from '../index';

export function* resizeBrowserScreen({
  payload,
}: ReturnType<typeof resizeScreen>) {
  const { width, height } = payload;
  yield put(appActions.setScreenDimension({ width, height }));
}

export function* rehydrateAutorunSettings() {
  try {
    const settings = localStorage.getItem(QUERY_AUTORUN_KEY);
    if (settings) {
      const { autorun } = JSON.parse(settings);
      yield put(appActions.setQueryAutorun({ autorun }));
    }
  } catch (err) {
    console.error(err);
  }
}
