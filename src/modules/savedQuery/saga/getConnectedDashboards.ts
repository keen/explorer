/* eslint-disable @typescript-eslint/camelcase */

import { put, getContext } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { savedQueryActions } from '../index';
import {
  DASHBOARDS_API_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../../constants';

type DashboardMetaData = {
  id: string;
  title: null | string;
  widgets: number;
  queries: number;
  tags: string[];
  lastModificationDate: number;
  isPublic: boolean;
  publicAccessKey: null | string;
};

export function* getConnectedDashboards(savedQueryId: string) {
  const {
    config: { readKey, projectId },
  } = yield getContext(KEEN_CLIENT_CONTEXT);
  const dashboardsApiUrl = yield getContext(DASHBOARDS_API_CONTEXT);

  if (!dashboardsApiUrl) return;

  yield put(savedQueryActions.updateConnectedDashboards(null));
  yield put(savedQueryActions.setConnectedDashboardsError(false));
  yield put(savedQueryActions.setConnectedDashboardsLoading(true));

  try {
    const response: Response = yield fetch(
      `${dashboardsApiUrl}/projects/${projectId}/dashboards/metadata?savedQueryId=${savedQueryId}`,
      {
        headers: {
          Authorization: readKey,
        },
      }
    );

    if (response.status === HttpStatus.OK) {
      const responseBody: DashboardMetaData[] = yield response.json();
      const dashboards = responseBody.map(({ title, id }) => ({ title, id }));
      yield put(savedQueryActions.updateConnectedDashboards(dashboards));
    } else {
      yield put(savedQueryActions.setConnectedDashboardsError(true));
    }
  } catch (error) {
    yield put(savedQueryActions.setConnectedDashboardsError(true));
  } finally {
    yield put(savedQueryActions.setConnectedDashboardsLoading(false));
  }
}