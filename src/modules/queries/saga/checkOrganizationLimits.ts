/* eslint-disable @typescript-eslint/camelcase */
import { getContext, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { queriesSlice } from '../reducer';

import { KEEN_CLIENT_CONTEXT } from '../../../constants';

/**
 * Flow responsible for checking resources usage for organization
 * @return void
 *
 */
export function* checkOrganizationLimits() {
  try {
    const client = yield getContext(KEEN_CLIENT_CONTEXT);
    const url = client.url('/3.0/projects/{projectId}/organization-usage', {
      api_key: client.config.masterKey,
    });

    const response: Response = yield fetch(url);

    if (response.status === HttpStatus.OK) {
      const responseBody = yield response.json();
      const {
        cached_queries: { limited, limit, current_usage },
      } = responseBody;

      const limitReached = limited && current_usage >= limit;
      const cachedQueriesLimit = limit;

      yield put(
        queriesSlice.actions.setCacheQueryLimitExceed({ limitReached })
      );
      yield put(
        queriesSlice.actions.setCacheQueryLimit({ limit: cachedQueriesLimit })
      );
    }
  } catch (error) {
    yield put(queriesSlice.actions.setQueryCacheLimitError({ error }));
  }
}
