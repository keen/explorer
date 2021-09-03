/* eslint-disable @typescript-eslint/camelcase */

import { put, getContext } from 'redux-saga/effects';

import { savedQueryActions } from '../index';
import {
  DASHBOARDS_API_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../../constants';
import { sortConnectedDashboards } from '../utils/sortConnectedDashboards';

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

export function* getConnectedDashboards({
  payload,
}: ReturnType<typeof savedQueryActions.getDashboardsConnection>) {
  const {
    config: { readKey, projectId },
  } = yield getContext(KEEN_CLIENT_CONTEXT);
  const dashboardsApiUrl = yield getContext(DASHBOARDS_API_CONTEXT);

  if (!dashboardsApiUrl) {
    yield put(savedQueryActions.getDashboardsConnectionDone());
    return;
  }

  const { name } = payload;

  yield put(savedQueryActions.updateConnectedDashboards(null));
  yield put(savedQueryActions.setConnectedDashboardsError(false));
  yield put(savedQueryActions.setConnectedDashboardsLoading(true));

  try {
    const response: DashboardMetaData[] = yield fetch(
      `${dashboardsApiUrl}/projects/${projectId}/dashboards/metadata?savedQueryId=${name}`,
      {
        headers: {
          Authorization: readKey,
        },
      }
    ).then((res) => res.json());

    const dashboards = response.map(({ title, id }) => ({ title, id }));
    yield put(
      savedQueryActions.updateConnectedDashboards(
        sortConnectedDashboards(dashboards)
      )
    );
  } catch (error) {
    yield put(savedQueryActions.setConnectedDashboardsError(true));
    yield put(savedQueryActions.updateConnectedDashboards(null));
  } finally {
    yield put(savedQueryActions.setConnectedDashboardsLoading(false));
    yield put(savedQueryActions.getDashboardsConnectionDone());
  }
}
