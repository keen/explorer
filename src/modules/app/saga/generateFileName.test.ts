/* eslint-disable @typescript-eslint/camelcase */

import sagaHelper from 'redux-saga-testing';
import { select } from 'redux-saga/effects';

import { getQuerySettings } from '../../queries';
import { savedQuerySelectors } from '../../savedQuery';

import { generateFileName as generateFileNameFlow } from './generateFileName';

describe('generateFileName()', () => {
  describe('Scenario 1: Query has a name', () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => 1487076708000);

    const query = {
      name: 'queryName',
      visualization: {
        chartSettings: {},
      },
    };
    const querySettings = {
      analysis_type: 'count',
      event_collection: 'test',
    };

    const test = sagaHelper(generateFileNameFlow());

    test('gets saved query', (result) => {
      expect(result).toEqual(select(savedQuerySelectors.getSavedQuery));
      return query;
    });

    test('gets query settings', (result) => {
      expect(result).toEqual(select(getQuerySettings));
      return querySettings;
    });

    test('returns filename', (result) => {
      expect(result).toEqual('queryName-1487076708000');
    });
  });

  describe('Scenario 2: Query does not have a name', () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => 1487076708000);

    const query = {
      visualization: {
        chartSettings: {},
      },
    };
    const querySettings = {
      analysis_type: 'count',
      event_collection: 'test',
    };

    const test = sagaHelper(generateFileNameFlow());

    test('gets saved query', (result) => {
      expect(result).toEqual(select(savedQuerySelectors.getSavedQuery));
      return query;
    });

    test('gets query settings', (result) => {
      expect(result).toEqual(select(getQuerySettings));
      return querySettings;
    });

    test('returns filename', (result) => {
      expect(result).toEqual('count-test-1487076708000');
    });
  });
});
