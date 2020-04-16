import {
  all,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';

import {
  client,
} from '../..';

function* fetchProject() {
  try {
    const url = client.url('/3.0/projects/{projectId}',
      { api_key: client.config.masterKey }
    );
    const responseBody = yield fetch(url)
      .then(response => response.json());
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
const getEventCollection = (state) => state.ui.eventCollection;
const getUI = (state) => state.ui;

function* filterPropsForUI({ payload }) {
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
    let {
      orderBy,
      limit,
    } = yield select(getUI);
    if (targetProperty && !schemaKeys.includes(targetProperty)) {
      yield put({
        type: 'UI_UPDATE',
        payload: {
          targetProperty: undefined,
        },
      });
    }
    if (propertyNames) {
      const filteredPropertyNames = propertyNames.filter(item => schemaKeys.includes(item));
      yield put({
        type: 'UI_UPDATE',
        payload: {
          propertyNames: filteredPropertyNames,
        },
      });
    }
    if (filters) {
      const filteredFilters = filters.filter(item => schemaKeys.includes(item.propertyName));
      yield put({
        type: 'UI_UPDATE',
        payload: {
          filters: filteredFilters,
        },
      });
    }
    if (groupBy) {
      let filteredGroupBy = groupBy.filter(item => schemaKeys.includes(item));
      if (!filteredGroupBy.length) {
        filteredGroupBy = undefined,
        limit = undefined;
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
  } catch(err) {
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
    const url = client.url(`/3.0/projects/{projectId}/events/${payload.eventCollection}`,
      { api_key: client.config.masterKey }
    );
    const responseBody = yield fetch(url)
      .then(response => response.json());
    let { properties = {} } = responseBody;
    let propertiesKeys = Object.keys(properties);

    if (propertiesKeys.length > 500 && !loadHeavySchemas) {
      // heavy schema - try to remove invalid keys
      propertiesKeys = propertiesKeys.filter(item => {
        return (item.indexOf('{') === -1 && item.indexOf('request.params') === -1);
      });
      const validProperties = {};
      propertiesKeys.forEach(key => {
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

function* query({ payload }) {
  try {
    const responseBody = yield client.query(payload);
    yield put({
      type: 'CLIENT_RUN_QUERY_SUCCESS',
      payload: responseBody,
    });
  } catch (e) {
    yield put({
      type: 'CLIENT_RUN_QUERY_ERROR',
      payload: e,
    });
  }
}

function* saveQuery({ payload }) {
  try {
    const { name, body } = payload;
    const responseBody = yield client
      .put({
        url: client.url('queries', 'saved', name),
        apiKey: client.config.masterKey,
        params: body,
      });
    yield put({
      type: 'CLIENT_SAVE_QUERY_SUCCESS',
      payload: responseBody,
    });
  } catch (e) {
    if (e.status === 400) {
      yield put({
        type: 'ABOVE_CACHE_QUERY_LIMIT',
      });
    } else {
      yield put({
        type: 'CLIENT_SAVE_QUERY_ERROR',
        payload: e,
      });
    }
  }
}

function* deleteQuery({ payload }) {
  try {
    const { name } = payload;
    yield client
      .del(client.url('queries', 'saved', name))
      .auth(client.masterKey())
      .send();
    yield put({
      type: 'RESET_SAVED_QUERY_UI',
    });
    yield put({
      type: 'CLIENT_DELETE_QUERY_SUCCESS',
      payload,
    });
  } catch (e) {
    yield put({
      type: 'CLIENT_RUN_QUERY_ERROR',
      payload: e,
    });
  }
}

function* fetchSavedQueries() {
  try {
    const responseBody = yield client
      .get(client.url('queries', 'saved'))
      .auth(client.masterKey())
      .send();
    yield put({
      type: 'CLIENT_FETCH_SAVED_QUERIES_SUCCESS',
      payload: responseBody,
    });
  } catch (e) {
    yield put({
      type: 'CLIENT_SAVE_QUERY_ERROR',
      payload: e,
    });
  }
}

function* checkCacheLimits() {
  try {
    const url = client.url('/3.0/projects/{projectId}/organization-usage',
      { api_key: client.config.masterKey }
    );
      const responseBody = yield fetch(url)
      .then(response => response.json());
    if(responseBody) {
      const { cached_queries: { limited, limit, current_usage} } = responseBody;
      if (limited && current_usage >= limit) {
        yield put({
          type: 'ABOVE_CACHE_QUERY_LIMIT',
        })
      } else {
        yield put({
          type: 'BELOW_CACHE_QUERY_LIMIT'
        })
      }
    }
  } catch (e) {
    yield put({
      type: 'CACHE_QUERY_LIMIT_ERROR',
      payload: e,
    })
  }
}

export function* watcher() {
  yield takeLatest('CLIENT_FETCH_PROJECT', fetchProject);
  yield takeLatest('CLIENT_FETCH_SCHEMA', fetchSchema);
  yield takeLatest('CHANGE_EVENT_COLLECTION', fetchSchema);
  yield takeLatest('CLIENT_FETCH_SCHEMA_SUCCESS', filterPropsForUI);
  yield takeLatest('CLIENT_FETCH_RECENT_EVENTS', fetchRecentEvents);
  yield takeLatest('CLIENT_RUN_QUERY', query);
  yield takeLatest('CLIENT_SAVE_QUERY', saveQuery);
  yield takeLatest('CLIENT_DELETE_QUERY', deleteQuery);
  yield takeLatest([
    'CLIENT_FETCH_SAVED_QUERIES',
    'CLIENT_SAVE_QUERY_SUCCESS',
    'CLIENT_DELETE_SAVED_QUERY_SUCCESS',
  ], fetchSavedQueries);
  yield takeLatest(['RESET_UI', 'CLIENT_SAVE_QUERY_SUCCESS', 'CLIENT_DELETE_SAVED_QUERY_SUCCESS'], checkCacheLimits);
}

export default function* rootSaga() {
  yield all([
    watcher(),
  ]);
}
