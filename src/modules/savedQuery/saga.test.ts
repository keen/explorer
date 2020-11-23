/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { select, put } from 'redux-saga/effects';
import { Layout } from '@keen.io/ui-core';

import { selectSavedQuery, updateSavedQuery } from './actions';
import { selectSavedQuery as selectSavedQueryFlow } from './saga';

import { runQuery, getSavedQueries, setQuerySettings } from '../queries';
import { setVisualization } from '../app';

import { savedQueries } from './fixtures';

describe('selectSavedQuery()', () => {
  describe('Scenario 1: User selects query with enabled autorun', () => {
    const action = selectSavedQuery('purchases', true);
    const it = sagaHelper(
      selectSavedQueryFlow(action as ReturnType<typeof selectSavedQuery>)
    );

    it('get list of saved queries from state', (result) => {
      expect(result).toEqual(select(getSavedQueries));
      return savedQueries;
    });

    it('setup visualization type', (result) => {
      const chartSettings = {
        layout: 'vertical' as Layout,
      };

      expect(result).toEqual(put(setVisualization('bar', chartSettings, {})));
    });

    it('setup query settings', (result) => {
      const query = {
        analysis_type: 'count',
      };

      expect(result).toEqual(put(setQuerySettings(query)));
    });

    it('updates save query settings', (result) => {
      const savedQuery = {
        cached: false,
        displayName: 'purchases',
        name: 'purchases',
        tags: [],
      };
      expect(result).toMatchObject(put(updateSavedQuery(savedQuery)));
    });

    it('runs selected query', (result) => {
      const query = {
        analysis_type: 'count',
      };

      expect(result).toEqual(put(runQuery(query)));
    });
  });
});
