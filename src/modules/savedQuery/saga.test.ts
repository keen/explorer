/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { select, put } from 'redux-saga/effects';

import { Query } from '@keen.io/query';
import { Layout } from '@keen.io/ui-core';

import { selectSavedQuery, updateSavedQuery } from './actions';
import { selectSavedQuery as selectSavedQueryFlow } from './saga';

import { queriesActions, getSavedQueries } from '../queries';
import { setVisualization } from '../app';

describe('selectSavedQuery()', () => {
  describe('Scenario 1: User selects query with enabled autorun', () => {
    const action = selectSavedQuery('purchases', true);
    const test = sagaHelper(
      selectSavedQueryFlow(action as ReturnType<typeof selectSavedQuery>)
    );

    const query: Query = {
      analysis_type: 'count',
      event_collection: 'logins',
      timeframe: 'this_14_days',
    };

    const savedQuery = {
      refreshRate: 0,
      cached: false,
      displayName: 'purchases',
      name: 'purchases',
      tags: [],
      visualization: {
        type: 'bar',
        chartSettings: {
          layout: 'vertical' as Layout,
        },
        widgetSettings: {},
      },
      query,
    };

    test('get list of saved queries from state', (result) => {
      expect(result).toEqual(select(getSavedQueries));
      return [savedQuery];
    });

    test('setup visualization type', (result) => {
      const {
        visualization: { chartSettings },
      } = savedQuery;
      expect(result).toEqual(put(setVisualization('bar', chartSettings, {})));
    });

    test('setup query settings', (result) => {
      expect(result).toEqual(
        put(queriesActions.setQuerySettings({ settings: query }))
      );
    });

    test('updates save query settings', (result) => {
      const savedQuery = {
        cached: false,
        displayName: 'purchases',
        name: 'purchases',
        tags: [],
      };
      expect(result).toMatchObject(put(updateSavedQuery(savedQuery)));
    });

    test('runs selected query', (result) => {
      expect(result).toEqual(put(queriesActions.runQuery({ query })));
    });
  });
});
