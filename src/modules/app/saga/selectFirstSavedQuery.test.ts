/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { select, put } from 'redux-saga/effects';
import { Query } from '@keen.io/query';

import { selectFirstSavedQuery } from './selectFirstSavedQuery';

import {
  queriesActions,
  queriesSelectors,
  SavedQueryListItem,
} from '../../queries';
import { savedQueryActions } from '../../savedQuery';

describe('Scenario 1: Selects first saved query from collection', () => {
  const test = sagaHelper(selectFirstSavedQuery());

  const savedQueries = [
    {
      displayName: 'Purchases',
    },
    {
      displayName: 'Average revenue',
      name: 'average-revenue',
      query: {
        analysis_type: 'count',
      },
    },
  ] as SavedQueryListItem[];

  test('get saved queries collection from state', (result) => {
    expect(result).toEqual(select(queriesSelectors.getSavedQueries));

    return savedQueries;
  });

  test('serializes saved query', (result) => {
    expect(result).toEqual(
      put(savedQueryActions.selectSavedQuery('average-revenue'))
    );
  });

  test('set query settings', (result) => {
    expect(result).toEqual(
      put(
        queriesActions.setQuerySettings({
          settings: {
            analysis_type: 'count',
          } as Query,
        })
      )
    );
  });
});

describe('Scenario 2: Do not selects query for empty collection', () => {
  const test = sagaHelper(selectFirstSavedQuery());

  test('get saved queries collection from state', (result) => {
    expect(result).toEqual(select(queriesSelectors.getSavedQueries));

    return [];
  });

  test('terminates saga flow', (result) => {
    expect(result).toBeUndefined();
  });
});
