import {
  ADD_GROUP,
  SET_GROUPS,
  SELECT_GROUP_PROPERTY,
  REMOVE_GROUP,
  RESET_GROUPS,
} from './constants';

import { GroupByActions } from './types';

export const initialState: string[] = [];

type State = (string | null)[];

export const groupByReducer = (state: State, action: GroupByActions): State => {
  switch (action.type) {
    case RESET_GROUPS:
      return initialState;
    case ADD_GROUP:
      return [...state, null];
    case SET_GROUPS:
      return action.payload.groups;
    case SELECT_GROUP_PROPERTY:
      return state.map((group, idx) => {
        if (idx === action.payload.index) return action.payload.property;
        return group;
      });
    case REMOVE_GROUP:
      return state.filter((_, idx) => idx !== action.payload.index);
    default:
      return state;
  }
};
