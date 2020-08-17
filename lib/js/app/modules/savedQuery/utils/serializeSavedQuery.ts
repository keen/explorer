/* eslint-disable @typescript-eslint/camelcase */

import convertMilisecondsToMinutes from './convertMilisecondsToMinutes';

import { SavedQuery, SavedQueryAPIResponse } from '../types';

const serializeSavedQuery = ({
  query_name,
  refresh_rate,
  metadata,
}: SavedQueryAPIResponse): SavedQuery => ({
  name: query_name,
  displayName: metadata ? metadata.display_name : query_name,
  cached: !!refresh_rate,
  refreshRate: convertMilisecondsToMinutes(refresh_rate),
  exists: true,
});

export default serializeSavedQuery;
