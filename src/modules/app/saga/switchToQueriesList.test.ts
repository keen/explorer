import sagaHelper from 'redux-saga-testing';
import { call, put, select } from 'redux-saga/effects';
import { switchToQueriesList as switchToQueriesListFlow } from './switchToQueriesList';
import { selectFirstSavedQuery } from './selectFirstSavedQuery';
import { queriesActions } from '../../queries';
import { savedQuerySelectors } from '../../savedQuery';
import { appActions } from '../index';

describe('switchToQueriesList()', () => {
  const test = sagaHelper(switchToQueriesListFlow());

  test('set view mode', (result) => {
    expect(result).toEqual(put(appActions.setViewMode({ view: 'browser' })));
  });

  test('reset query results', (result) => {
    expect(result).toEqual(put(queriesActions.resetQueryResults()));
  });

  test('check if query exists', (result) => {
    expect(result).toEqual(select(savedQuerySelectors.getSavedQuery));
    return true;
  });

  test('selects first saved query', (result) => {
    expect(result).toEqual(call(selectFirstSavedQuery));
  });
});
