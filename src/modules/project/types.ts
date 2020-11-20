import { UPDATE_TAGS_POOL } from './constants';

export type ReducerState = {
  tagsPool: string[];
};

export interface UpdateTagsPoolAction {
  type: typeof UPDATE_TAGS_POOL;
  payload: {
    tags: string[];
  };
}

export type ProjectActions = UpdateTagsPoolAction;
