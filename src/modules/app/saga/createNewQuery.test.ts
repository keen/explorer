import sagaHelper from 'redux-saga-testing';
import { getContext, put } from 'redux-saga/effects';
import { createNewQuery as createNewQueryFlow } from './createNewQuery';
import { NEW_QUERY_EVENT, PUBSUB_CONTEXT } from '../../../constants';
import { queriesActions } from '../../queries';
import { savedQueryActions } from '../../savedQuery';
import { appActions } from '../index';

describe('createNewQuery()', () => {
  const test = sagaHelper(createNewQueryFlow());
  const pubsub = {
    publish: jest.fn(),
  };
  test('change application view to editor', (result) => {
    expect(result).toEqual(put(appActions.setViewMode({ view: 'editor' })));
  });

  test('get the PubSub from context', (result) => {
    expect(result).toEqual(getContext(PUBSUB_CONTEXT));
    return pubsub;
  });

  test('publish message to query creator', () => {
    expect(pubsub.publish).toBeCalledWith(NEW_QUERY_EVENT);
  });

  test('reset query results', (result) => {
    expect(result).toEqual(put(queriesActions.resetQueryResults()));
  });

  test('reset visualization settings', (result) => {
    expect(result).toEqual(put(appActions.resetVisualization()));
  });

  test('reset saved query settings', (result) => {
    expect(result).toEqual(put(savedQueryActions.resetSavedQuery()));
  });
});
