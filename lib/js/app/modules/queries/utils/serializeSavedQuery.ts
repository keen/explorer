/* eslint-disable @typescript-eslint/camelcase */
import camelCase from 'camelcase-keys';

import getDefaultVisualization from './getDefaultVisualization';

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
  visualization:
    metadata && metadata.visualization
      ? {
          type: metadata.visualization.type,
          chartSettings: camelCase(metadata.visualization.chart_settings, {
            deep: true,
          }),
          widgetSettings: camelCase(metadata.visualization.widget_settings, {
            deep: true,
          }),
        }
      : getDefaultVisualization(query),
  tags: metadata && metadata.tags ? metadata.tags : [],
  stepLabels: metadata && metadata.step_labels ? metadata.step_labels : [],
  query,
});

export default serializeSavedQuery;
