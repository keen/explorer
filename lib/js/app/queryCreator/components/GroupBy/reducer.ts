import { v4 as uuid } from 'uuid';

import {
  ADD_GROUP,
  SET_GROUPS,
  SELECT_GROUP_PROPERTY,
  REMOVE_GROUP,
  RESET_GROUPS,
} from './constants';

import { Group, GroupByActions } from './types';

export const initialState: Group[] = [];

type State = Group[];

export const groupByReducer = (state: State, action: GroupByActions): State => {
  switch (action.type) {
    case RESET_GROUPS:
      return initialState;
    case ADD_GROUP:
      return [
        ...state,
        {
          id: uuid(),
          property: action.payload.property,
        },
      ];
    case SET_GROUPS:
      return action.payload.groups;
    case SELECT_GROUP_PROPERTY:
      return state.map((group) => {
        if (group.id === action.payload.id)
          return { ...group, property: action.payload.property };
        return group;
      });
    case REMOVE_GROUP:
      return state.filter(({ id }) => id !== action.payload.id);
    default:
      return state;
  }
};
