import { queriesActions } from '../../queries';
import { serializeSavedQuery } from '../utils';
import { SavedQueryAPIResponse } from '../../../types';
import { put } from 'redux-saga/effects';
import { updateSavedQuery } from '../actions';

export function* saveQuerySuccessHandler(
  action: ReturnType<typeof queriesActions.saveQuerySuccess>
) {
  const {
    payload: { body },
  } = action;
  const savedQuery = serializeSavedQuery(body as SavedQueryAPIResponse);

  yield put(updateSavedQuery(savedQuery));
}
