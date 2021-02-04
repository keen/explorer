/* eslint-disable @typescript-eslint/no-empty-function */
import sagaHelper from 'redux-saga-testing';
import { getContext, put } from 'redux-saga/effects';
import { NEW_QUERY_EVENT } from '@keen.io/query-creator';

import { setViewMode, resetVisualization } from './actions';
import { resetQueryResults } from '../queries';
import { resetSavedQuery } from '../savedQuery';
import { createNewQuery as createNewQueryFlow } from './saga';

import { PUBSUB_CONTEXT } from '../../constants';

describe('createNewQuery()', () => {
  const it = sagaHelper(createNewQueryFlow());
  const pubsub = {
    publish: jest.fn(),
  };
  it('change application view to editor', (result) => {
    expect(result).toEqual(put(setViewMode('editor')));
  });

  it('get the PubSub from context', (result) => {
    expect(result).toEqual(getContext(PUBSUB_CONTEXT));
    return pubsub;
  });

  it('publish message to query creator', () => {
    expect(pubsub.publish).toBeCalledWith(NEW_QUERY_EVENT);
  });

  it('reset query results', (result) => {
    expect(result).toEqual(put(resetQueryResults()));
  });

  it('reset visualization settings', (result) => {
    expect(result).toEqual(put(resetVisualization()));
  });

  it('reset saved query settings', (result) => {
    expect(result).toEqual(put(resetSavedQuery()));
  });
});
