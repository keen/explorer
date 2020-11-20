import { createAction } from '@reduxjs/toolkit';
import { UPDATE_TAGS_POOL } from './constants';

export const updateTagsPool = createAction(
  UPDATE_TAGS_POOL,
  (tags: string[]) => ({
    payload: { tags },
  })
);

export type ProjectActions = ReturnType<typeof updateTagsPool>;
