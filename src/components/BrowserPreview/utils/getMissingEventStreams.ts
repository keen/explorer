import { SavedQueryListItem } from '../../../modules/queries';

export const getMissingEventStreams = (
  savedQuery: SavedQueryListItem,
  notExistingEventStreams: string[]
) => {
  const missingStreams = [];
  if (!savedQuery) return missingStreams;
  if (savedQuery.query.analysis_type === 'funnel') {
    savedQuery.query.steps.forEach((step) => {
      if (notExistingEventStreams.includes(step.event_collection)) {
        missingStreams.push(step.event_collection);
      }
    });
  }
  if (notExistingEventStreams.includes(savedQuery.query.event_collection)) {
    missingStreams.push(savedQuery.query.event_collection);
  }
  return missingStreams;
};
