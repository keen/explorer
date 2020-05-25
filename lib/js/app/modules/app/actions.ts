import { SET_STATE_IN_URL, LOAD_STATE_FROM_URL } from './constants';

import { AppActions } from './types';

export const persistState = (): AppActions => ({
  type: SET_STATE_IN_URL,
});

export const loadPersitedState = (): AppActions => ({
  type: LOAD_STATE_FROM_URL,
});
