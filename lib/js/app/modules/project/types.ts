import { updateTagsPool } from './actions';

export type ReducerState = {
  tagsPool: string[];
};

export type ProjectActions = ReturnType<typeof updateTagsPool>;
