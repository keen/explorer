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
  const {
    event_collection: eventCollection,
    property_names: propertyNames,
  } = query;

  if (eventCollection) {
    try {
      const isFullExtraction =
        propertyNames === undefined || propertyNames.length === 0;
      const extractionPropertiesLimit = yield getContext(
        CONFIRM_EXTRACTION_LIMIT
      );

      let propertiesCount = yield select(
        getEventStreamProperties,
        eventCollection
      );

      if (propertiesCount === undefined && isFullExtraction) {
        yield put(
          queriesSlice.actions.setQueryPerforming({ isPerforming: true })
        );

        const schemaProperties = yield call(
          fetchEventStreamProperties,
          eventCollection
        );
        propertiesCount = Object.keys(schemaProperties).length;
      }

      const isPropertiesLimitReached =
        (isFullExtraction && propertiesCount >= extractionPropertiesLimit) ||
        propertyNames?.length > extractionPropertiesLimit;

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
