import { all, call, select } from 'redux-saga/effects';
import { getEventStreams } from '../../schemas/selectors';
import { fetchEventStreamProperties } from '../../schemas';
import { checkIfStreamsExists } from './checkIfStreamsExists';

export function* isQueryEditable(query) {
  const eventStreamsToCheck = [];
  let queryHasExistingEventStream;

  if (query.analysis_type === 'funnel') {
    query.steps.forEach((stream) =>
      eventStreamsToCheck.push(stream.event_collection)
    );
  } else {
    eventStreamsToCheck.push(query.event_collection);
  }

  queryHasExistingEventStream = yield call(
    checkIfStreamsExists,
    eventStreamsToCheck
  );
  if (!queryHasExistingEventStream) {
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

  queryHasExistingEventStream = yield call(
    checkIfStreamsExists,
    eventStreamsToCheck
  );
  return queryHasExistingEventStream;
}
