import { AppState } from '../types';

export const getEventStreamProperties = (
  { schemas }: AppState,
  eventStreamName: string
) => schemas.eventStreams[eventStreamName];
