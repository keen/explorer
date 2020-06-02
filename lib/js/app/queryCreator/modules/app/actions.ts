import {
  APP_START,
  FETCH_PROJECT_DETAILS,
  FETCH_PROJECT_DETAILS_SUCCESS,
  FETCH_PROJECT_DETAILS_ERROR,
} from './constants';

import { AppActions } from './types';

export const appStart = (): AppActions => ({
  type: APP_START,
});

export const fetchProjectDetails = (): AppActions => ({
  type: FETCH_PROJECT_DETAILS,
});

export const fetchProjectDetailsSuccess = (): AppActions => ({
  type: FETCH_PROJECT_DETAILS_SUCCESS,
});

export const fetchProjectDetailsError = (error: Error): AppActions => ({
  type: FETCH_PROJECT_DETAILS_ERROR,
  payload: { error },
});
