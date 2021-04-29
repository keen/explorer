/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { getContext, put, take, select, call } from 'redux-saga/effects';
import { Query } from '@keen.io/query';

import { performExtraction } from './performExtraction';

import {
  runExtraction,
  cancelExtraction,
  continueExtraction,
} from '../actions';
import { queriesSlice } from '../reducer';

import {
  getEventStreamProperties,
  fetchEventStreamProperties,
} from '../../schemas';

import { CONFIRM_EXTRACTION_LIMIT } from '../../../constants';

const query: Query = {
  analysis_type: 'extraction',
  event_collection: 'logins',
  timeframe: 'last_30_days',
  property_names: undefined,
  limit: 100,
};

describe('Scenario 1: User continues extraction', () => {
  const test = sagaHelper(performExtraction(runExtraction(query)));
  const schemaPropertiesCount = 50;

  test('get extraction confirmation trigger limit', (result) => {
    expect(result).toEqual(getContext(CONFIRM_EXTRACTION_LIMIT));

    return 30;
  });

  test('get properties from event collection schema', (result) => {
    expect(result).toEqual(select(getEventStreamProperties, 'logins'));

    return schemaPropertiesCount;
  });

  test('shows extraction confirmation modal', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setExtractionConfirmation({ isVisible: true }))
    );
  });

  test('waits for user action', (result) => {
    expect(result).toEqual(
      take([cancelExtraction.type, continueExtraction.type])
    );

    return continueExtraction();
  });

  test('closes extraction confirmation modal', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setExtractionConfirmation({ isVisible: false }))
    );
  });

  test('performs extraction', (result) => {
    expect(result).toEqual(put(queriesSlice.actions.runQuery({ query })));
  });
});

describe('Scenario 2: Performs extraction as properties limit is not reached', () => {
  const test = sagaHelper(performExtraction(runExtraction(query)));
  const schemaPropertiesCount = 50;

  test('get extraction confirmation trigger limit', (result) => {
    expect(result).toEqual(getContext(CONFIRM_EXTRACTION_LIMIT));

    return 100;
  });

  test('get properties from event collection schema', (result) => {
    expect(result).toEqual(select(getEventStreamProperties, 'logins'));

    return schemaPropertiesCount;
  });

  test('performs extraction', (result) => {
    expect(result).toEqual(put(queriesSlice.actions.runQuery({ query })));
  });
});

describe('Scenario 3: User cancel extraction', () => {
  const test = sagaHelper(performExtraction(runExtraction(query)));
  const schemaPropertiesCount = 50;

  test('get extraction confirmation trigger limit', (result) => {
    expect(result).toEqual(getContext(CONFIRM_EXTRACTION_LIMIT));

    return 30;
  });

  test('get properties from event collection schema', (result) => {
    expect(result).toEqual(select(getEventStreamProperties, 'logins'));

    return schemaPropertiesCount;
  });

  test('shows extraction confirmation modal', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setExtractionConfirmation({ isVisible: true }))
    );
  });

  test('waits for user action', (result) => {
    expect(result).toEqual(
      take([cancelExtraction.type, continueExtraction.type])
    );

    return cancelExtraction();
  });

  test('closes extraction confirmation modal', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setExtractionConfirmation({ isVisible: false }))
    );
  });

  test('set query performing state', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setQueryPerforming({ isPerforming: false }))
    );
  });
});

describe('Scenario 4: User performs extraction and schema is not serialized', () => {
  const test = sagaHelper(performExtraction(runExtraction(query)));

  test('get extraction confirmation trigger limit', (result) => {
    expect(result).toEqual(getContext(CONFIRM_EXTRACTION_LIMIT));

    return 30;
  });

  test('get properties from event collection schema', (result) => {
    expect(result).toEqual(select(getEventStreamProperties, 'logins'));

    return undefined;
  });

  test('set query performing state', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setQueryPerforming({ isPerforming: true }))
    );
  });

  test('set query performing state', (result) => {
    expect(result).toEqual(call(fetchEventStreamProperties, 'logins'));

    return {
      'keen.id': 'string',
    };
  });

  test('performs extraction', (result) => {
    expect(result).toEqual(put(queriesSlice.actions.runQuery({ query })));
  });
});

describe('Scenario 5: User performs extraction with selected properties', () => {
  const query: Query = {
    analysis_type: 'extraction',
    event_collection: 'logins',
    timeframe: 'last_30_days',
    property_names: ['user.id', 'user.name'],
    limit: 100,
  };

  const test = sagaHelper(performExtraction(runExtraction(query)));

  test('get extraction confirmation trigger limit', (result) => {
    expect(result).toEqual(getContext(CONFIRM_EXTRACTION_LIMIT));

    return 30;
  });

  test('get properties from event collection schema', (result) => {
    expect(result).toEqual(select(getEventStreamProperties, 'logins'));

    return undefined;
  });

  test('performs extraction', (result) => {
    expect(result).toEqual(put(queriesSlice.actions.runQuery({ query })));
  });
});

describe('Scenario 6: User performs extraction with selected properties and reach limit', () => {
  const query: Query = {
    analysis_type: 'extraction',
    event_collection: 'logins',
    timeframe: 'last_30_days',
    property_names: ['user.id', 'user.name', 'keen.created_at'],
    limit: 100,
  };

  const test = sagaHelper(performExtraction(runExtraction(query)));

  test('get extraction confirmation trigger limit', (result) => {
    expect(result).toEqual(getContext(CONFIRM_EXTRACTION_LIMIT));

    return 2;
  });

  test('get properties from event collection schema', (result) => {
    expect(result).toEqual(select(getEventStreamProperties, 'logins'));

    return undefined;
  });

  test('shows extraction confirmation modal', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setExtractionConfirmation({ isVisible: true }))
    );
  });

  test('waits for user action', (result) => {
    expect(result).toEqual(
      take([cancelExtraction.type, continueExtraction.type])
    );
  });
});
