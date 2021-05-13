import { SavedQueryListItem } from '../../../modules/queries';

export const getMissingEventStreams = (
  query: SavedQueryListItem,
  notExistingEventStreams: string[]
) => {
  const missingStreams = [];
  if (!query) return missingStreams;
  if (query.query.analysis_type === 'funnel') {
    query.query.steps.forEach((step) => {
      if (notExistingEventStreams.includes(step.event_collection)) {
        missingStreams.push(step.event_collection);
      }
    });
  }
  if (notExistingEventStreams.includes(query.query.event_collection)) {
    missingStreams.push(query.query.event_collection);
  }
  return missingStreams;
};
