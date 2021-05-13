import sagaHelper from 'redux-saga-testing';
import { checkIfStreamsExists } from './checkIfStreamsExists';
import { select } from 'redux-saga/effects';
import { getNotExistingEventStreams } from '../../schemas/selectors';

describe('checkIfStreamsExists', () => {
  const eventStream = 'eventStream';

  describe('Scenario 1: Return false when some of event streams not exist', () => {
    const test = sagaHelper(checkIfStreamsExists([eventStream]));

    test('get not existing event streams', (result) => {
      expect(result).toEqual(select(getNotExistingEventStreams));
      return [eventStream];
    });

    test('return false when some of streams not exists', (result) => {
      expect(result).toEqual(false);
    });
  });

  describe('Scenario 2: Return true when all of event streams exist', () => {
    const test = sagaHelper(checkIfStreamsExists([eventStream]));

    test('get not existing event streams', (result) => {
      expect(result).toEqual(select(getNotExistingEventStreams));
      return [];
    });

    test('return true when streams exists', (result) => {
      expect(result).toEqual(true);
    });
  });
});
