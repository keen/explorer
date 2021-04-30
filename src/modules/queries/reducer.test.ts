/* eslint-disable @typescript-eslint/camelcase */
import { Query } from '@keen.io/query';
import { Layout } from '@keen.io/ui-core';
import { PickerWidgets } from '@keen.io/widget-picker';

import { queriesSlice, initialState } from './reducer';

import { APIError } from '../../types';

test('set run query indicators', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'logins',
    timeframe: 'this_14_days',
  };

  const action = queriesSlice.actions.runQuery({ query });
  const { isQueryPerforming, results, error } = queriesSlice.reducer(
    { ...initialState, isQueryPerforming: false, results: [] },
    action
  );

  expect(isQueryPerforming).toBeTruthy();
  expect(results).toBeNull();
  expect(error).toBeNull();
});

test('serializes results after query was successfully run', () => {
  const action = queriesSlice.actions.runQuerySuccess({
    results: { value: 10 },
  });
  const { results, isQueryPerforming } = queriesSlice.reducer(
    { ...initialState, isQueryPerforming: true, results: null },
    action
  );

  expect(isQueryPerforming).toEqual(false);
  expect(results).toEqual({ value: 10 });
});

test('set saved queries in state', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'logins',
    timeframe: 'this_14_days',
  };

  const savedQuery = {
    refreshRate: 0,
    cached: false,
    displayName: 'purchases',
    lastModifiedDate: 'lastModifiedDate',
    name: 'purchases',
    tags: [],
    visualization: {
      type: 'bar' as PickerWidgets,
      chartSettings: {
        layout: 'vertical' as Layout,
      },
      widgetSettings: {},
    },
    query,
  };

  const action = queriesSlice.actions.getSavedQueriesSuccess({
    queries: [savedQuery],
  });

  const state = queriesSlice.reducer(initialState, action);

  expect(state.savedQueries).toEqual([savedQuery]);
  expect(state.isSavedQueriesLoaded).toEqual(true);
});

test('set extraction confirmation visibility', () => {
  const action = queriesSlice.actions.setExtractionConfirmation({
    isVisible: true,
  });
  const {
    extractionConfirmation: { isVisible },
  } = queriesSlice.reducer(initialState, action);

  expect(isVisible).toBeTruthy();
});

test('set save query error', () => {
  const error: APIError = {
    error_code: '@errorCode',
    body: '@body',
    status: 500,
  };

  const action = queriesSlice.actions.setSaveQueryError({ error });

  const state = queriesSlice.reducer(
    { ...initialState, isSavingQuery: true },
    action
  );

  expect(state.saveQueryError).toEqual(error);
  expect(state.isSavingQuery).toBeFalsy();
});

test('set query save state', () => {
  const action = queriesSlice.actions.setQuerySaveState({ isSaving: true });

  const state = queriesSlice.reducer(
    { ...initialState, isSavingQuery: false },
    action
  );

  expect(state.isSavingQuery).toEqual(true);
});

test('set query settings', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'logins',
    timeframe: 'this_14_days',
  };

  const action = queriesSlice.actions.setQuerySettings({ settings: query });
  const { settings } = queriesSlice.reducer(initialState, action);

  expect(settings).toEqual(query);
});

test('resets query execution results', () => {
  const action = queriesSlice.actions.resetQueryResults();
  const { results } = queriesSlice.reducer(
    {
      ...initialState,
      results: [],
    },
    action
  );

  expect(results).toBeNull();
});

test('updates state for perfoming query', () => {
  const action = queriesSlice.actions.setQueryPerforming({
    isPerforming: true,
  });
  const { isQueryPerforming } = queriesSlice.reducer(
    { ...initialState, isQueryPerforming: false },
    action
  );

  expect(isQueryPerforming).toBeTruthy();
});

test('updates state for perfoming save query', () => {
  const action = queriesSlice.actions.saveQuery({
    name: 'purchases',
    body: {},
  });
  const { saveQueryError, isSavingQuery } = queriesSlice.reducer(
    initialState,
    action
  );

  expect(isSavingQuery).toBeTruthy();
  expect(saveQueryError).toBeNull();
});

test('reset saved query error', () => {
  const action = queriesSlice.actions.resetSavedQueryError();
  const { saveQueryError } = queriesSlice.reducer(
    {
      ...initialState,
      saveQueryError: { error_code: 'ErrorCode', body: '', status: 400 },
    },
    action
  );

  expect(saveQueryError).toBeNull();
});

test('updates state after successful query save', () => {
  const action = queriesSlice.actions.saveQuerySuccess({
    name: 'purchases',
    body: {},
  });
  const { saveQueryError, isSavingQuery } = queriesSlice.reducer(
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
  const action = queriesSlice.actions.setCacheQueryLimit({ limit: 10 });
  const { cachedQueries } = queriesSlice.reducer(initialState, action);

  expect(cachedQueries.limit).toEqual(10);
});

test('updates cached queries limit exceed indicator', () => {
  const action = queriesSlice.actions.setCacheQueryLimitExceed({
    limitReached: true,
  });
  const { cachedQueries } = queriesSlice.reducer(initialState, action);

  expect(cachedQueries.limitReached).toBeTruthy();
});

test('removes saved query from collection', () => {
  const savedQueriesList: any = [
    { name: 'last-purchases' },
    { name: 'marketing' },
  ];

  const action = queriesSlice.actions.deleteQuerySuccess({
    queryName: 'last-purchases',
  });
  const { savedQueries } = queriesSlice.reducer(
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
