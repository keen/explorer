import { select } from 'redux-saga/effects';
import { getNotExistingEventStreams } from '../../schemas/selectors';

export function* checkIfStreamsExists(eventStreamsToCheck: string[]) {
  const notExistingEventStreams = yield select(getNotExistingEventStreams);
  return !eventStreamsToCheck.some((eventStream) =>
    notExistingEventStreams.includes(eventStream)
  );
}
