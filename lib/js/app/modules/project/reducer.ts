import { ReducerState, ProjectActions } from './types';

import { UPDATE_TAGS_POOL } from './constants';

export const initialState: ReducerState = {
  tagsPool: [],
};

export const projectReducer = (
  state: ReducerState = initialState,
  action: ProjectActions
) => {
  switch (action.type) {
    case UPDATE_TAGS_POOL:
      return {
        ...state,
        tagsPool: action.payload.tags,
      };
    default:
      return state;
  }
};
