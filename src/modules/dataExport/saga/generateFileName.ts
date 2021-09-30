import { select } from 'redux-saga/effects';
import { savedQuerySelectors } from '../../savedQuery';
import { getQuerySettings } from '../../queries';

export function* generateFileName() {
  const savedQuery = yield select(savedQuerySelectors.getSavedQuery);
  const query = yield select(getQuerySettings);

  let fileName = 'chart';
  if (savedQuery?.name) {
    fileName = `${savedQuery.name}-${Date.now()}`;
  } else if (query?.analysis_type && query?.event_collection) {
    fileName = `${query.analysis_type}-${query.event_collection}-${Date.now()}`;
  }
  return fileName;
}
