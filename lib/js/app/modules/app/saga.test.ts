import sagaHelper from 'redux-saga-testing';
import { put, select } from 'redux-saga/effects';

import { getSavedQuery, updateSaveQuery } from '../savedQuery';
import { getQueryCreator } from '../queryCreator';

import { updateUI } from '../../redux/actionCreators/ui';

import { loadPersitedState, persistState } from './saga';

import { b64EncodeUnicode } from '../../utils/base64';
import { URL_STATE } from './constants';

describe('persistState() - equal states', () => {
  const it = sagaHelper(persistState());

  // @ts-ignore
  const windowSpy = jest.spyOn(global, 'window', 'get');

  const storeState = {
    userInterface: { analysisType: 'count' },
    savedQuery: { name: 'query' },
  };

  const persistedState = b64EncodeUnicode(JSON.stringify(storeState));

  windowSpy.mockImplementation(() => ({
    location: {
      href: `http://keen-explorer.io?${URL_STATE}=${persistedState}`,
    } as any,
  }));

  it('should get query creator state', (result) => {
    expect(result).toEqual(select(getQueryCreator));
    return storeState.userInterface;
  });

  it('should current saved query', (result) => {
    expect(result).toEqual(select(getSavedQuery));
    return storeState.savedQuery;
  });

  it('should terminate saga for equal states', (result) => {
    expect(result).toBeUndefined();
  });

  windowSpy.mockRestore();
});

describe('loadPersitedState()', () => {
  const it = sagaHelper(loadPersitedState());

  // @ts-ignore
  const windowSpy = jest.spyOn(global, 'window', 'get');

  const storeState = {
    userInterface: { analysisType: 'count' },
    savedQuery: { name: 'query' },
  };

  const persistedState = b64EncodeUnicode(JSON.stringify(storeState));

  windowSpy.mockImplementation(() => ({
    location: {
      href: `http://keen-explorer.io?${URL_STATE}=${persistedState}`,
    } as any,
  }));

  it('should dispatch action to update query creator', (result) => {
    const action = updateUI({
      ...storeState.userInterface,
      autoload: true,
    });

    expect(result).toEqual(put(action));
  });

  it('should dispatch action to restore saved query', (result) => {
    const action = updateSaveQuery({
      ...storeState.savedQuery,
    });

    expect(result).toEqual(put(action));
  });

  windowSpy.mockRestore();
});
