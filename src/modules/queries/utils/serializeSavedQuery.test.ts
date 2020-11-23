/* eslint-disable @typescript-eslint/camelcase */
import serializeSavedQuery from './serializeSavedQuery';

import { SavedQueryAPIResponse } from '../../../types';

test('serializes saved query', () => {
  const savedQuery: SavedQueryAPIResponse = {
    query_name: 'purchases',
    refresh_rate: 14000,
    user_last_modified_date: 'user_last_modified_date',
    created_date: 'created_date',
    last_modified_date: 'last_modified_date',
    query: { analysis_type: 'count' },
    metadata: {
      display_name: 'purchases',
      visualization: {
        type: 'bar',
        chart_settings: {
          layout: 'vertical',
          group_mode: 'grouped',
        },
        widget_settings: {},
      },
    },
  };

  expect(serializeSavedQuery(savedQuery)).toMatchSnapshot();
});
