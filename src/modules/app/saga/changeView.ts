import { setViewMode as setViewModeAction } from '../actions';
import { push } from 'connected-react-router';
import { put, select } from 'redux-saga/effects';
import { ROUTES } from '../../../constants';
import { savedQuerySelectors } from '../../savedQuery';

/**
 * Flow responsible for changing the views
 *
 * @return void
 *
 */
export function* changeView({ payload }: ReturnType<typeof setViewModeAction>) {
  const { view } = payload;
  let route = '';
  if (view === 'browser') {
    route = ROUTES.BROWSER;
  } else if (view === 'editor') {
    route = ROUTES.EDITOR;
  }
  const savedQueryName = yield select(savedQuerySelectors.getSavedQueryName);
  if (savedQueryName) {
    route += '?savedQuery=' + savedQueryName;
  }
  yield put(push(route));
}