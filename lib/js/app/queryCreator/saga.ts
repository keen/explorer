import { all, select, takeLatest, getContext, put } from 'redux-saga/effects';

import {
  fetchProjectDetails,
  fetchProjectDetailsSuccess,
  fetchProjectDetailsError,
  APP_START,
  FETCH_PROJECT_DETAILS,
} from './modules/app';

import {
  SelectEventCollectionAction,
  UpdateFunnelStepEventCollectionAction,
  SELECT_EVENT_COLLECTION,
  UPDATE_FUNNEL_STEP_EVENT_COLLECTION,
} from './modules/query';

import {
  FetchCollectionSchemaAction,
  fetchCollectionSchema,
  fetchCollectionSchemaSuccess,
  fetchCollectionSchemaError,
  setEventsCollections,
  getCollectionSchema,
  FETCH_COLLECTION_SCHEMA,
} from './modules/events';

function* appStart() {
  yield put(fetchProjectDetails());
}

function* fetchProject() {
  const client = yield getContext('keenClient');

  try {
    const url = client.url('/3.0/projects/{projectId}', {
      api_key: client.config.masterKey,
    });
    const { events } = yield fetch(url).then((response) => response.json());
    const collections = events.map(({ name }) => name);

    yield put(fetchProjectDetailsSuccess());
    yield put(setEventsCollections(collections));
  } catch (err) {
    yield put(fetchProjectDetailsError(err));
  }
}

function* fetchSchema(action: FetchCollectionSchemaAction) {
  const collection = action.payload.collection;
  const client = yield getContext('keenClient');
  try {
    const url = client.url(`/3.0/projects/{projectId}/events/${collection}`, {
      api_key: client.config.masterKey,
    });
    const { properties } = yield fetch(url).then((response) => response.json());
    yield put(fetchCollectionSchemaSuccess(collection, properties));
  } catch (err) {
    yield put(fetchCollectionSchemaError(err));
  }
}

function* selectCollection(
  action: SelectEventCollectionAction | UpdateFunnelStepEventCollectionAction
) {
  const collection = action.payload.name;
  if (collection) {
    const state = yield select();
    const schema = getCollectionSchema(state, collection);
    if (!schema) yield put(fetchCollectionSchema(collection));
  }
}

function* watcher() {
  yield takeLatest(APP_START, appStart);
  yield takeLatest(FETCH_PROJECT_DETAILS, fetchProject);
  yield takeLatest(FETCH_COLLECTION_SCHEMA, fetchSchema);
  yield takeLatest(UPDATE_FUNNEL_STEP_EVENT_COLLECTION, selectCollection);
  yield takeLatest(SELECT_EVENT_COLLECTION, selectCollection);
}

export default function* rootSaga() {
  yield all([watcher()]);
}
