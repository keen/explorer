/* eslint-disable @typescript-eslint/camelcase */
import { SavedQueryListItem } from '../types';
import { SavedQueryAPIResponse } from '../../../types';

const serializeSavedQuery = ({
  query_name,
  refresh_rate,
  user_last_modified_date,
  metadata,
  query,
}: SavedQueryAPIResponse): SavedQueryListItem => ({
  name: query_name,
  displayName: metadata ? metadata.display_name : query_name,
  cached: !!refresh_rate,
  refreshRate: refresh_rate,
  lastModifiedDate: user_last_modified_date,
  widget: metadata ? metadata.widget : null,
  tags: metadata && metadata.tags ? metadata.tags : [],
  query,
});

export default serializeSavedQuery;
