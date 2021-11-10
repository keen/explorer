import sagaHelper from 'redux-saga-testing';
import { put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { appActions } from '../index';
import { changeView } from './changeView';
import { savedQuerySelectors } from '../../savedQuery';

describe('Scenario 1: pushes router state with saved query', () => {
  const action = appActions.setViewMode({ view: 'browser' });

  const test = sagaHelper(changeView(action));

  test('get saved queries collection from state', (result) => {
    expect(result).toEqual(select(savedQuerySelectors.getSavedQueryName));
    return '@queryName';
  });

  test('terminates saga flow', (result) => {
    expect(result).toEqual(put(push('/browser?savedQuery=@queryName')));
  });
});

describe('Scenario 2: pushes router state without saved query', () => {
  const action = appActions.setViewMode({ view: 'editor' });

  const test = sagaHelper(changeView(action));

  test('get saved queries collection from state', (result) => {
    expect(result).toEqual(select(savedQuerySelectors.getSavedQueryName));
    return null;
  });

  test('terminates saga flow', (result) => {
    expect(result).toEqual(put(push('/editor')));
  });
});
