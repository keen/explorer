import { all, select, takeLatest, getContext, put } from 'redux-saga/effects';
import moment from 'moment-timezone';

import {
  fetchProjectDetails,
  fetchProjectDetailsSuccess,
  fetchProjectDetailsError,
  APP_START,
  FETCH_PROJECT_DETAILS,
} from './modules/app';

import {
  getTimeframe,
  getEventCollection,
  setTimeframe,
  setGroupBy,
  SetQueryAction,
  SelectTimezoneAction,
  SelectEventCollectionAction,
  SET_QUERY,
  SELECT_TIMEZONE,
  SELECT_EVENT_COLLECTION,
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

function* selectCollection(action: SelectEventCollectionAction) {
  const collection = action.payload.name;
  if (collection) {
    const state = yield select();
    const schema = getCollectionSchema(state, collection);
    if (!schema) yield put(fetchCollectionSchema(collection));
  }

  yield put(setGroupBy(undefined));
}

function* selectTimezone(action: SelectTimezoneAction) {
  const { timezone } = action.payload;
  const timeframe = yield select(getTimeframe);

  if (typeof timeframe !== 'string') {
    const { start, end } = timeframe;
    const timeWithZone = {
      start: moment(start).tz(timezone).format(),
      end: moment(end).tz(timezone).format(),
    };
    yield put(setTimeframe(timeWithZone));
  }
}

function* setQuery(action: SetQueryAction) {
  const {
    payload: { query },
  } = action;
  if (query.eventCollection)
    yield put(fetchCollectionSchema(query.eventCollection));
}

function* watcher() {
  yield takeLatest(APP_START, appStart);
  yield takeLatest(SET_QUERY, setQuery);
  yield takeLatest(FETCH_PROJECT_DETAILS, fetchProject);
  yield takeLatest(FETCH_COLLECTION_SCHEMA, fetchSchema);
  yield takeLatest(SELECT_TIMEZONE, selectTimezone);
  yield takeLatest(SELECT_EVENT_COLLECTION, selectCollection);
}

export default function* rootSaga() {
  yield all([watcher()]);
}
