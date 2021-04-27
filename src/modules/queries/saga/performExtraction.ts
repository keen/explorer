import { getContext, call, select, put, take } from 'redux-saga/effects';

import {
  cancelExtraction,
  continueExtraction,
  runExtraction,
  runQuery,
  setQueryPerforming,
  setExtractionConfirmation,
} from '../actions';
import {
  getEventStreamProperties,
  fetchEventStreamProperties,
} from '../../schemas';

import { NOTIFICATION_MANAGER_CONTEXT } from '../../../constants';

/**
 * Flow responsible for performing extraction analysis
 * @param eventCollection - name of event collection
 * @return void
 *
 */
export function* performExtraction({
  payload,
}: ReturnType<typeof runExtraction>) {
  const { query } = payload;
  const { event_collection: eventCollection } = query;

  if (eventCollection) {
    try {
      let propertiesCount = yield select(
        getEventStreamProperties,
        eventCollection
      );

      if (propertiesCount === undefined) {
        yield put(setQueryPerforming(true));

        const schemaProperties = yield call(
          fetchEventStreamProperties,
          eventCollection
        );
        propertiesCount = Object.keys(schemaProperties).length;
      }

      const isPropertiesLimitReached = true;

      if (isPropertiesLimitReached) {
        yield put(setExtractionConfirmation(true));
        const action = yield take([
          cancelExtraction.type,
          continueExtraction.type,
        ]);

        yield put(setExtractionConfirmation(false));

        if (action.type === cancelExtraction.type) {
          yield put(setQueryPerforming(false));
        } else {
          yield put(runQuery(query));
        }
      } else {
        yield put(runQuery(query));
      }
    } catch (err) {
      yield put(setQueryPerforming(false));
    }
  } else {
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    yield notificationManager.showNotification({
      type: 'error',
      message: 'kaczka',
    });
  }
}
