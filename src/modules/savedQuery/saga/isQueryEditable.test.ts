/* eslint-disable @typescript-eslint/camelcase */

import sagaHelper from 'redux-saga-testing';
import { checkIfStreamsExists } from './checkIfStreamsExists';
import { all, call, select } from 'redux-saga/effects';
import { getEventStreams } from '../../schemas/selectors';
import { isQueryEditable } from './isQueryEditable';
import { fetchEventStreamProperties } from '../../schemas';

describe('isQueryEditable', () => {
  const query = {
    analysis_type: 'test_type',
    event_collection: 'test_event_collection',
  };

  describe('Scenario 1: Query is not editable - stored event stream not exists', () => {
    const test = sagaHelper(isQueryEditable(query));

    test('check if query has existing event stream', (result) => {
      expect(result).toEqual(
        call(checkIfStreamsExists, [query.event_collection])
      );
      return false;
    });
    test('return false when stream not exists', (result) => {
      expect(result).toEqual(false);
    });
  });

  describe('Scenario 2: Query is not editable - fetched event stream not exists', () => {
    const test = sagaHelper(isQueryEditable(query));

    test('check if query has existing event stream', (result) => {
      expect(result).toEqual(
        call(checkIfStreamsExists, [query.event_collection])
      );
      return true;
    });
    test('get stored event streams', (result) => {
      expect(result).toEqual(select(getEventStreams));
      return {};
    });
    test('fetch not stored event streams', (result) => {
      expect(result).toEqual(
        all([call(fetchEventStreamProperties, query.event_collection)])
      );
    });
    test('check if streams exist', (result) => {
      expect(result).toEqual(
        call(checkIfStreamsExists, [query.event_collection])
      );
      return false;
    });
    test('return false when stream not exists', (result) => {
      expect(result).toEqual(false);
    });
  });

  describe('Scenario 3: Query is editable - event stream exists', () => {
    const test = sagaHelper(isQueryEditable(query));

    test('check if query has existing event stream', (result) => {
      expect(result).toEqual(
        call(checkIfStreamsExists, [query.event_collection])
      );
      return true;
    });
    test('get stored event streams', (result) => {
      expect(result).toEqual(select(getEventStreams));
      return {};
    });
    test('fetch not stored event streams', (result) => {
      expect(result).toEqual(
        all([call(fetchEventStreamProperties, query.event_collection)])
      );
    });
    test('check if streams exist', (result) => {
      expect(result).toEqual(
        call(checkIfStreamsExists, [query.event_collection])
      );
      return true;
    });
    test('return false when stream not exists', (result) => {
      expect(result).toEqual(true);
    });
  });

  describe('Scenario 4: Funnel chart - Query is editable - event streams exists', () => {
    const query = {
      analysis_type: 'funnel',
      steps: [{ event_collection: 'test1' }, { event_collection: 'test2' }],
    };

    const test = sagaHelper(isQueryEditable(query));

    test('check if query has existing event streams', (result) => {
      expect(result).toEqual(call(checkIfStreamsExists, ['test1', 'test2']));
      return true;
    });
    test('get stored event streams', (result) => {
      expect(result).toEqual(select(getEventStreams));
      return {
        test1: 5,
      };
    });
    test('fetch not stored event streams', (result) => {
      expect(result).toEqual(all([call(fetchEventStreamProperties, 'test2')]));
    });
    test('check if streams exist', (result) => {
      expect(result).toEqual(call(checkIfStreamsExists, ['test1', 'test2']));
      return true;
    });
    test('return true when streams exist', (result) => {
      expect(result).toEqual(true);
    });
  });
});
