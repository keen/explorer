import { put } from 'redux-saga/effects';
import { QUERY_AUTORUN_KEY } from '../constants';
import { appActions } from '../index';

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
