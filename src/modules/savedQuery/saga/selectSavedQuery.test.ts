/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { select, put, call } from 'redux-saga/effects';

import { Query } from '@keen.io/query';
import { Layout } from '@keen.io/ui-core';

import { selectSavedQuery as selectSavedQueryFlow } from './selectSavedQuery';

import { queriesActions, getSavedQueries } from '../../queries';
import { setVisualization } from '../../app';
import { isQueryEditable } from './isQueryEditable';
import { savedQueryActions } from '../index';
import { selectSavedQuery } from '../actions';

describe('selectSavedQuery()', () => {
  describe('Scenario 1: User selects query with enabled autorun - query is editable', () => {
    const action = savedQueryActions.selectSavedQuery('purchases', true);
    const test = sagaHelper(
      selectSavedQueryFlow(
        action as ReturnType<typeof savedQueryActions.selectSavedQuery>
      )
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

    test('set saved query loading state', (result) => {
      expect(result).toEqual(put(savedQueryActions.setQueryLoading(true)));
      return [savedQuery];
    });

    test('get list of saved queries from state', (result) => {
      expect(result).toEqual(select(getSavedQueries));
      return [savedQuery];
    });

    test('check if query is editable', (result) => {
      expect(result).toEqual(call(isQueryEditable, query));
      return true;
    });

    test('set saved query as editable', (result) => {
      expect(result).toEqual(put(savedQueryActions.setQueryEditable(true)));
      return true;
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
      expect(result).toMatchObject(
        put(savedQueryActions.updateSavedQuery(savedQuery))
      );
    });

    test('runs selected query', (result) => {
      expect(result).toEqual(put(queriesActions.runQuery({ query })));
    });

    test('set save query loading state as false', (result) => {
      expect(result).toEqual(put(savedQueryActions.setQueryLoading(false)));
    });
  });

  describe('Scenario 2: User selects query with enabled autorun - query is not editable', () => {
    const action = savedQueryActions.selectSavedQuery('purchases', true);
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

    test('set saved query loading state', (result) => {
      expect(result).toEqual(put(savedQueryActions.setQueryLoading(true)));
      return [savedQuery];
    });

    test('get list of saved queries from state', (result) => {
      expect(result).toEqual(select(getSavedQueries));
      return [savedQuery];
    });

    test('check if query is editable', (result) => {
      expect(result).toEqual(call(isQueryEditable, query));
      return false;
    });

    test('set saved query as editable', (result) => {
      expect(result).toEqual(put(savedQueryActions.setQueryEditable(false)));
      return true;
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
      expect(result).toMatchObject(
        put(savedQueryActions.updateSavedQuery(savedQuery))
      );
    });

    test('set save query loading state as false', (result) => {
      expect(result).toEqual(put(savedQueryActions.setQueryLoading(false)));
    });
  });
});
