import { all, call, select } from 'redux-saga/effects';
import { getEventStreams } from '../../schemas/selectors';
import { fetchEventStreamProperties } from '../../schemas';
import { checkIfStreamsExists } from './checkIfStreamsExists';

export function* isQueryEditable(query) {
  const eventStreamsToCheck = [];
  let allEventStreamsExist;

  if (query.analysis_type === 'funnel') {
    query.steps.forEach((stream) =>
      eventStreamsToCheck.push(stream.event_collection)
    );
  } else {
    eventStreamsToCheck.push(query.event_collection);
  }

  allEventStreamsExist = yield call(checkIfStreamsExists, eventStreamsToCheck);
  if (!allEventStreamsExist) {
    return false;
  }
  const eventStreamsProperties = yield select(getEventStreams);

  const eventStreamsWithPropertiesToFetch = eventStreamsToCheck.filter(
    (eventStream) => eventStreamsProperties[eventStream] === undefined
  );
  yield all(
    eventStreamsWithPropertiesToFetch.map((eventStream: string) =>
      call(fetchEventStreamProperties, eventStream)
    )
  );

  allEventStreamsExist = yield call(checkIfStreamsExists, eventStreamsToCheck);
  return allEventStreamsExist;
}
