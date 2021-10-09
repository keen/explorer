/* eslint-disable @typescript-eslint/camelcase */

import sagaHelper from 'redux-saga-testing';
import { getContext, put, select, take } from 'redux-saga/effects';
import { SET_CHART_SETTINGS } from '@keen.io/query-creator/dist';

import { getSavedQueries } from '../../queries';
import { appActions } from '../index';
import { updateChartSettings, updateQueryCreator } from '../actions';
import { PUBSUB_CONTEXT } from '../../../constants';
import { editQuery as editQueryFlow } from './editQuery';

describe('editQuery()', () => {
  describe('Scenario 1: not funnel', () => {
    const queries = [
      {
        name: 'queryName',
        query: {
          analysis_type: 'count',
        },
        visualization: {
          chartSettings: {},
        },
      },
    ];

    const action = appActions.editQuery('queryName');
    const test = sagaHelper(editQueryFlow(action));

    test('set editor view', (result) => {
      expect(result).toEqual(put(appActions.setViewMode({ view: 'editor' })));
    });

    test('takes query editor mounted', (result) => {
      expect(result).toEqual(take(appActions.queryEditorMounted.type));
    });

    test('gets saved queries', (result) => {
      expect(result).toEqual(select(getSavedQueries));
      return queries;
    });

    test('updates query creator', (result) => {
      expect(result).toEqual(
        put(
          updateQueryCreator({
            analysis_type: 'count',
          })
        )
      );
    });
  });

  describe('Scenario 2: funnel', () => {
    const queries = [
      {
        name: 'queryName',
        query: {
          analysis_type: 'funnel',
        },
        visualization: {
          chartSettings: {
            stepLabels: ['Step1', 'Step2'],
          },
        },
      },
    ];

    const pubsubMock = {
      publish: jest.fn(),
    };

    const action = appActions.editQuery('queryName');
    const test = sagaHelper(editQueryFlow(action));

    test('set editor view', (result) => {
      expect(result).toEqual(put(appActions.setViewMode({ view: 'editor' })));
    });

    test('takes query editor mounted', (result) => {
      expect(result).toEqual(take(appActions.queryEditorMounted.type));
    });

    test('gets saved queries', (result) => {
      expect(result).toEqual(select(getSavedQueries));
      return queries;
    });

    test('gets pubsub context', (result) => {
      expect(result).toEqual(getContext(PUBSUB_CONTEXT));
      return pubsubMock;
    });

    test('updates chart settings', (result) => {
      expect(result).toEqual(
        pubsubMock.publish(SET_CHART_SETTINGS, {
          chartSettings: { stepLabel: ['Step1', 'Step2'] },
        })
      );
      return queries;
    });

    test('updates query creator', (result) => {
      expect(result).toEqual(
        put(
          updateChartSettings({
            stepLabels: ['Step1', 'Step2'],
          })
        )
      );
    });
  });
});
