/* eslint-disable @typescript-eslint/camelcase */

import { getContext, put } from 'redux-saga/effects';

import { schemasSlice } from '../reducer';

import { KEEN_CLIENT_CONTEXT } from '../../../constants';

/**
 * Fetch schema definition based on provided event stream name.
 * @param eventStream - name of event stream
 * @return properties schema
 *
 */
export function* fetchEventStreamProperties(eventStream: string) {
  const client = yield getContext(KEEN_CLIENT_CONTEXT);
  try {
    const url = client.url(`/3.0/projects/{projectId}/events/${eventStream}`, {
      api_key: client.config.masterKey,
    });
    const response: Response = yield fetch(url);
    const { properties } = yield response.json();
    console.log({ properties });
    yield put(
      schemasSlice.actions.setEventStreamProperties({
        eventStream,
        propertiesCount: Object.keys(properties).length,
      })
    );
    return properties;
  } catch (err) {
    yield put(schemasSlice.actions.addNotExistingEventStream(eventStream));
  }
}
