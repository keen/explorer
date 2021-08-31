import sagaHelper from 'redux-saga-testing';
import { getContext } from 'redux-saga/effects';
import { UPDATE_VISUALIZATION_TYPE } from '@keen.io/query-creator';
import { updateVisualizationType as updateVisualizationTypeFlow } from './updateVisualizationType';
import { updateVisualizationType } from '../actions';
import { PUBSUB_CONTEXT } from '../../../constants';

describe('updateVisualizationType()', () => {
  const pubsub = {
    publish: jest.fn(),
  };
  const type = 'metric';
  const action = updateVisualizationType(type);
  const test = sagaHelper(
    updateVisualizationTypeFlow(
      action as ReturnType<typeof updateVisualizationType>
    )
  );

  test('get the PubSub from context', (result) => {
    expect(result).toEqual(getContext(PUBSUB_CONTEXT));
    return pubsub;
  });

  test('publish message to query creator', () => {
    expect(pubsub.publish).toBeCalledWith(UPDATE_VISUALIZATION_TYPE, { type });
  });
});
