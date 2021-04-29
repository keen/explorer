/* eslint-disable @typescript-eslint/camelcase */

import { getContext, put } from 'redux-saga/effects';

import { schemasSlice } from '../reducer';

import { KEEN_CLIENT_CONTEXT } from '../../../constants';

/**
 * Flow responsible for
 *
 * @return void
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

    yield put(
      schemasSlice.actions.setEventStreamProperties({
        eventStream,
        propertiesCount: Object.keys(properties).length,
      })
    );

    return properties;
  } catch (err) {
    return {};
  }
}
