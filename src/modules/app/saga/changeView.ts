import { push } from 'connected-react-router';
import { put, select } from 'redux-saga/effects';
import { ROUTES } from '../../../constants';
import { savedQuerySelectors } from '../../savedQuery';
import { appActions } from '../index';

/**
 * Flow responsible for changing the views
 *
 * @return void
 *
 */
export function* changeView({
  payload,
}: ReturnType<typeof appActions.setViewMode>) {
  const { view } = payload;
  let route = '';
  console.log('payload', payload);
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
