/* eslint-disable @typescript-eslint/no-empty-function */
import sagaHelper from 'redux-saga-testing';
import { getContext, put } from 'redux-saga/effects';
import { NEW_QUERY_EVENT } from '@keen.io/query-creator';

// import { setViewMode, resetVisualization } from './actions';
import { queriesActions } from '../queries';
import { createNewQuery as createNewQueryFlow } from './appSaga';

import { PUBSUB_CONTEXT } from '../../constants';
import { savedQueryActions } from '../savedQuery';
import { appSlice } from './reducer';

describe('createNewQuery()', () => {
  const test = sagaHelper(createNewQueryFlow());
  const pubsub = {
    publish: jest.fn(),
  };
  test('change application view to editor', (result) => {
    expect(result).toEqual(
      put(appSlice.actions.setViewMode({ view: 'editor' }))
    );
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
    expect(result).toEqual(put(appSlice.actions.resetVisualization()));
  });

  test('reset saved query settings', (result) => {
    expect(result).toEqual(put(savedQueryActions.resetSavedQuery()));
  });
});
