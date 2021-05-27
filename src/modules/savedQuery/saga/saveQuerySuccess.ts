import { queriesActions } from '../../queries';
import { serializeSavedQuery } from '../utils';
import { SavedQueryAPIResponse } from '../../../types';
import { put } from 'redux-saga/effects';
import { savedQueryActions } from '../index';

export function* saveQuerySuccessHandler(
  action: ReturnType<typeof queriesActions.saveQuerySuccess>
) {
  const {
    payload: { body },
  } = action;
  const savedQuery = serializeSavedQuery(body as SavedQueryAPIResponse);

  yield put(savedQueryActions.updateSavedQuery(savedQuery));
}
