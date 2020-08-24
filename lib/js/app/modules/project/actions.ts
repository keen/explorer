import { UPDATE_TAGS_POOL } from './constants';

import { ProjectActions } from './types';

export const updateTagsPool = (tags: string[]): ProjectActions => ({
  type: UPDATE_TAGS_POOL,
  payload: { tags },
});
