import sagaHelper from 'redux-saga-testing';
import { put } from 'redux-saga/effects';

import { resizeScreen } from '../actions';
import { resizeBrowserScreen as resizeBrowserScreenFlow } from './resizeBrowserScreen';
import { appActions } from '../index';

describe('resizeBrowserScreen()', () => {
  const width = 100;
  const height = 100;
  const action = resizeScreen(width, height);
  const test = sagaHelper(
    resizeBrowserScreenFlow(action as ReturnType<typeof resizeScreen>)
  );

  test('sets screen dimension', (result) => {
    expect(result).toEqual(
      put(appActions.setScreenDimension({ width, height }))
    );
  });
});
