import { AppState } from '../types';

export const getEventStreamProperties = (
  { schemas }: AppState,
  eventStreamName: string
) => schemas.eventStreams[eventStreamName];

export const getEventStreams = ({ schemas }: AppState) => schemas.eventStreams;

export const getNotExistingEventStreams = ({ schemas }: AppState) =>
  schemas.notExistingEventStreams;
