import sagaHelper from 'redux-saga-testing';
import { getContext } from 'redux-saga/effects';
import { SET_QUERY_EVENT } from '@keen.io/query-creator';
import { updateCreator as updateCreatorFlow } from './updateCreator';
import { updateQueryCreator } from '../actions';
import { PUBSUB_CONTEXT } from '../../../constants';

describe('updateCreator()', () => {
  const pubsub = {
    publish: jest.fn(),
  };
  const query = {};
  const action = updateQueryCreator(query);
  const test = sagaHelper(
    updateCreatorFlow(action as ReturnType<typeof updateQueryCreator>)
  );

  test('get the PubSub from context', (result) => {
    expect(result).toEqual(getContext(PUBSUB_CONTEXT));
    return pubsub;
  });

  test('publish message to query creator', () => {
    expect(pubsub.publish).toBeCalledWith(SET_QUERY_EVENT, { query });
  });
});
