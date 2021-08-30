import sagaHelper from 'redux-saga-testing';

import { persistAutorunSettings as persistAutorunSettingsFlow } from './persistAutorunSettings';
import { appActions } from '../index';
import { QUERY_AUTORUN_KEY } from '../constants';

describe('persistAutorunSettings()', () => {
  const autorun = true;
  const action = appActions.setQueryAutorun({ autorun });
  const test = sagaHelper(
    persistAutorunSettingsFlow(
      action as ReturnType<typeof appActions.setQueryAutorun>
    )
  );

  test('sets autorun value in local storage', () => {
    expect(localStorage.getItem(QUERY_AUTORUN_KEY)).toEqual(
      JSON.stringify({ autorun })
    );
  });
});
