/* eslint-disable @typescript-eslint/camelcase */
import { getContext, put } from 'redux-saga/effects';

import { queriesSlice } from '../reducer';
import { getSavedQueriesError } from '../actions';
import { serializeSavedQuery } from '../utils';

import { SavedQueryAPIResponse } from '../../../types';

import { KEEN_CLIENT_CONTEXT } from '../../../constants';

export function* fetchSavedQueriesList() {
  try {
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const responseBody: SavedQueryAPIResponse[] = yield client
      .get(client.url('queries', 'saved'))
      .auth(client.masterKey())
      .send();

    const savedQueries = responseBody.map(serializeSavedQuery);

    yield put(
      queriesSlice.actions.getSavedQueriesSuccess({ queries: savedQueries })
    );
  } catch (error) {
    yield put(getSavedQueriesError(error));
  }
}
