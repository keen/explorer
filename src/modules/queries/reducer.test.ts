/* eslint-disable @typescript-eslint/camelcase */

import { queriesReducer, initialState } from './reducer';

import {
  resetQueryResults,
  resetSavedQueryError,
  saveQuery,
  saveQuerySuccess,
  setCacheQueryLimit,
  setCacheQueryLimitExceed,
  deleteQuerySuccess,
} from './actions';

test('resets query execution results', () => {
  const action = resetQueryResults();
  const { results } = queriesReducer(
    {
      ...initialState,
      results: [],
    },
    action
  );

  expect(results).toBeNull();
});

test('updates state for perfoming save query', () => {
  const action = saveQuery('last-purchases', {});
  const { saveQueryError, isSavingQuery } = queriesReducer(
    initialState,
    action
  );

  expect(isSavingQuery).toBeTruthy();
  expect(saveQueryError).toBeNull();
});

test('reset saved query error', () => {
  const action = resetSavedQueryError();
  const { saveQueryError } = queriesReducer(
    {
      ...initialState,
      saveQueryError: { error_code: 'ErrorCode', body: '', status: 400 },
    },
    action
  );

  expect(saveQueryError).toBeNull();
});

test('updates state after successful query save', () => {
  const action = saveQuerySuccess('last-purchases', {});
  const { saveQueryError, isSavingQuery } = queriesReducer(
    {
      ...initialState,
      isSavingQuery: true,
      saveQueryError: { error_code: 'ErrorCode', body: '', status: 500 },
    },
    action
  );

  expect(isSavingQuery).toBeFalsy();
  expect(saveQueryError).toBeNull();
});

test('updates cached queries limit', () => {
  const action = setCacheQueryLimit(10);
  const { cachedQueries } = queriesReducer(initialState, action);

  expect(cachedQueries.limit).toEqual(10);
});

test('updates cached queries limit exceed indicator', () => {
  const action = setCacheQueryLimitExceed(true);
  const { cachedQueries } = queriesReducer(initialState, action);

  expect(cachedQueries.limitReached).toBeTruthy();
});

test('removes saved query from collection', () => {
  const savedQueriesList: any = [
    { name: 'last-purchases' },
    { name: 'marketing' },
  ];

  const action = deleteQuerySuccess('last-purchases');
  const { savedQueries } = queriesReducer(
    { ...initialState, savedQueries: savedQueriesList },
    action
  );

  expect(savedQueries).toMatchInlineSnapshot(`
    Array [
      Object {
        "name": "marketing",
      },
    ]
  `);
});
