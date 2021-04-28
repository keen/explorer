import { getContext, call, select, put, take } from 'redux-saga/effects';

import {
  cancelExtraction,
  continueExtraction,
  runExtraction,
} from '../actions';
import {
  getEventStreamProperties,
  fetchEventStreamProperties,
} from '../../schemas';

import { queriesSlice } from '../reducer';

import {
  NOTIFICATION_MANAGER_CONTEXT,
  CONFIRM_EXTRACTION_LIMIT,
} from '../../../constants';

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
        yield put(
          queriesSlice.actions.setQueryPerforming({ isPerforming: true })
        );

        const schemaProperties = yield call(
          fetchEventStreamProperties,
          eventCollection
        );
        propertiesCount = Object.keys(schemaProperties).length;
      }

      const extractionPropertiesLimit = yield getContext(
        CONFIRM_EXTRACTION_LIMIT
      );
      const isPropertiesLimitReached =
        propertiesCount >= extractionPropertiesLimit;

      if (isPropertiesLimitReached) {
        yield put(
          queriesSlice.actions.setExtractionConfirmation({ isVisible: true })
        );
        const action = yield take([
          cancelExtraction.type,
          continueExtraction.type,
        ]);

        yield put(
          queriesSlice.actions.setExtractionConfirmation({ isVisible: false })
        );

        if (action.type === cancelExtraction.type) {
          yield put(
            queriesSlice.actions.setQueryPerforming({ isPerforming: false })
          );
        } else {
          yield put(queriesSlice.actions.runQuery({ query }));
        }
      } else {
        yield put(queriesSlice.actions.runQuery({ query }));
      }
    } catch (err) {
      yield put(
        queriesSlice.actions.setQueryPerforming({ isPerforming: false })
      );
    }
  } else {
    const notificationManager = yield getContext(NOTIFICATION_MANAGER_CONTEXT);
    yield notificationManager.showNotification({
      type: 'error',
      message: 'notifications.execute_extraction_error',
    });
  }
}
