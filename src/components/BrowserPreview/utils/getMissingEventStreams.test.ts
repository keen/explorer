/* eslint-disable @typescript-eslint/camelcase */

import { getMissingEventStreams } from './getMissingEventStreams';
import { SavedQueryListItem } from '../../../modules/queries';

const notExistingEventStreams = [
  'eventStream1',
  'eventStream3',
  'eventStream5',
];

const funnelQuery = {
  query: {
    analysis_type: 'funnel',
    steps: [
      {
        event_collection: 'eventStream1',
      },
      {
        event_collection: 'eventStream2',
      },
      {
        event_collection: 'eventStream3',
      },
    ],
  },
};

const query = {
  query: {
    analysis_type: 'area',
    event_collection: 'eventStream3',
  },
};

describe('getMissingEventStreams()', () => {
  test('return missing streams', () => {
    const missingStreams = getMissingEventStreams(
      query as SavedQueryListItem,
      notExistingEventStreams
    );
    expect(missingStreams).toStrictEqual(['eventStream3']);
  });

  test('return missing streams for funnel', () => {
    const missingStreams = getMissingEventStreams(
      funnelQuery as SavedQueryListItem,
      notExistingEventStreams
    );
    expect(missingStreams).toStrictEqual(['eventStream1', 'eventStream3']);
  });
});
