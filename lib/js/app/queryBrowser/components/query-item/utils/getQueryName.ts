import { SavedQuery } from '../../../types';

export const getQueryName = ({ metadata, queryName }: SavedQuery) => {
  if (metadata?.displayName) return metadata.displayName;
  return queryName;
};
