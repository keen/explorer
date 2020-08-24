/* eslint-disable @typescript-eslint/camelcase */

import convertMilisecondsToMinutes from './convertMilisecondsToMinutes';

import { SavedQuery } from '../types';
import { SavedQueryAPIResponse } from '../../../types';

const serializeSavedQuery = ({
  query_name,
  refresh_rate,
  metadata,
}: SavedQueryAPIResponse): Partial<SavedQuery> => ({
  name: query_name,
  displayName: metadata ? metadata.display_name : query_name,
  cached: !!refresh_rate,
  tags: metadata && metadata.tags ? metadata.tags : [],
  refreshRate: convertMilisecondsToMinutes(refresh_rate),
  exists: true,
});

export default serializeSavedQuery;
