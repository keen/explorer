import sagaHelper from 'redux-saga-testing';
import { getContext, put } from 'redux-saga/effects';

import { NEW_QUERY_EVENT, PUBSUB_CONTEXT } from '../../../constants';
import { queriesActions } from '../../queries';
import { clearQuery as clearQueryFlow } from './clearQuery';

describe('clearQuery()', () => {
  const pubsubMock = {
    publish: jest.fn(),
  };
  const test = sagaHelper(clearQueryFlow());

  test('get the pubsub from context', (result) => {
    expect(result).toEqual(getContext(PUBSUB_CONTEXT));
    return pubsubMock;
  });

  test('pubsub to be called', () => {
    expect(pubsubMock.publish).toBeCalledWith(NEW_QUERY_EVENT);
  });

  test('reset query results to be called', (result) => {
    expect(result).toEqual(put(queriesActions.resetQueryResults()));
  });
});
