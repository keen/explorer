/* eslint-disable @typescript-eslint/camelcase */
import { all, put, takeLatest, select } from 'redux-saga/effects';

import { client } from '../../KeenExplorer';

import { savedQuerySaga } from '../../modules/savedQuery';
import { queriesSaga } from '../../modules/queries';
import { appSaga } from '../../modules/app';

function* fetchProject() {
  try {
    const url = client.url('/3.0/projects/{projectId}', {
      api_key: client.config.masterKey,
    });
    const responseBody = yield fetch(url).then((response) => response.json());
    yield put({
      type: 'CLIENT_FETCH_PROJECT_SUCCESS',
      payload: responseBody,
    });
  } catch (e) {
    yield put({
      type: 'CLIENT_FETCH_PROJECT_ERROR',
      payload: e,
    });
  }
}

const getSchemas = (state) => state.collections.schemas;
const getLoadHeavySchemas = (state) => state.ui.loadHeavySchemas;

const getUI = (state) => state.ui;

function* filterPropsForUI() {
  try {
    const {
      eventCollection,
      groupBy,
      filters,
      targetProperty,
      propertyNames,
    } = yield select(getUI);
    const schemas = yield select(getSchemas);
    const schema = schemas[eventCollection];
    const schemaKeys = Object.keys(schema);
    let { orderBy, limit } = yield select(getUI);
    if (targetProperty && !schemaKeys.includes(targetProperty)) {
      yield put({
        type: 'UI_UPDATE',
        payload: {
          targetProperty: undefined,
        },
      });
    }
    if (propertyNames) {
      const filteredPropertyNames = propertyNames.filter((item) =>
        schemaKeys.includes(item)
      );
      yield put({
        type: 'UI_UPDATE',
        payload: {
          propertyNames: filteredPropertyNames,
        },
      });
    }
    if (filters) {
      const filteredFilters = filters.filter((item) =>
        schemaKeys.includes(item.propertyName)
      );
      yield put({
        type: 'UI_UPDATE',
        payload: {
          filters: filteredFilters,
        },
      });
    }
    if (groupBy) {
      let filteredGroupBy = groupBy.filter((item) => schemaKeys.includes(item));
      if (!filteredGroupBy.length) {
        (filteredGroupBy = undefined), (limit = undefined);
        orderBy = undefined;
      }
      yield put({
        type: 'UI_UPDATE',
        payload: {
          groupBy: filteredGroupBy,
          limit,
          orderBy,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* fetchSchema({ payload }) {
  if (!payload.eventCollection) {
    return;
  }
  const schemas = yield select(getSchemas);
  if (schemas[payload.eventCollection]) {
    yield put({
      type: 'CLIENT_FETCH_SCHEMA_SUCCESS',
      eventCollection: payload.eventCollection,
      payload: {
        properties: schemas[payload.eventCollection],
      },
    });
    return;
  }
  const loadHeavySchemas = yield select(getLoadHeavySchemas);
  try {
    const url = client.url(
      `/3.0/projects/{projectId}/events/${payload.eventCollection}`,
      { api_key: client.config.masterKey }
    );
    const responseBody = yield fetch(url).then((response) => response.json());
    let { properties = {} } = responseBody;
    let propertiesKeys = Object.keys(properties);

    if (propertiesKeys.length > 500 && !loadHeavySchemas) {
      // heavy schema - try to remove invalid keys
      propertiesKeys = propertiesKeys.filter((item) => {
        return (
          item.indexOf('{') === -1 && item.indexOf('request.params') === -1
        );
      });
      const validProperties = {};
      propertiesKeys.forEach((key) => {
        validProperties[key] = properties[key];
      });
      properties = {
        ...validProperties,
      };
    }
    yield put({
      type: 'CLIENT_FETCH_SCHEMA_SUCCESS',
      eventCollection: payload.eventCollection,
      payload: {
        properties,
      },
    });
  } catch (e) {
    yield put({
      type: 'CLIENT_FETCH_SCHEMA_ERROR',
      payload: e,
    });
  }
}

function* fetchRecentEvents({ payload }) {
  try {
    const responseBody = yield client.query({
      analysisType: 'extraction',
      eventCollection: payload.eventCollection,
      latest: payload.latest || 10,
    });
    yield put({
      type: 'CLIENT_FETCH_RECENT_EVENTS_SUCCESS',
      eventCollection: payload.eventCollection,
      payload: responseBody,
    });
  } catch (e) {
    yield put({
      type: 'CLIENT_FETCH_RECENT_EVENTS_ERROR',
      payload: e,
    });
  }
}

export function* watcher() {
  yield takeLatest('CLIENT_FETCH_PROJECT', fetchProject);
  yield takeLatest('CLIENT_FETCH_SCHEMA', fetchSchema);
  yield takeLatest('CLIENT_FETCH_SCHEMA_SUCCESS', filterPropsForUI);
  yield takeLatest('CLIENT_FETCH_RECENT_EVENTS', fetchRecentEvents);
}

export default function* rootSaga() {
  yield all([watcher(), appSaga(), queriesSaga(), savedQuerySaga()]);
}
