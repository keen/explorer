/* eslint-disable @typescript-eslint/camelcase */
import { convertSecondsToHours } from '@keen.io/time-utils';

import { SavedQuery } from '../types';
import { SavedQueryAPIResponse } from '../../../types';

const serializeSavedQuery = ({
  query_name,
  refresh_rate,
  metadata,
}: SavedQueryAPIResponse): Partial<SavedQuery> => ({
  name: query_name,
  displayName: metadata?.display_name ? metadata.display_name : query_name,
  cached: !!refresh_rate,
  tags: metadata && metadata.tags ? metadata.tags : [],
  refreshRate: convertSecondsToHours(refresh_rate),
  exists: true,
});

export default serializeSavedQuery;
