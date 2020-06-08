import {
  ADD_GROUP,
  SELECT_GROUP_PROPERTY,
  REMOVE_GROUP,
  RESET_GROUPS,
  SET_GROUPS,
} from './constants';

import { GroupByActions } from './types';

export const resetGroups = (): GroupByActions => ({
  type: RESET_GROUPS,
});

export const addGroup = (): GroupByActions => ({
  type: ADD_GROUP,
});

export const setGroups = (groups: string[]): GroupByActions => ({
  type: SET_GROUPS,
  payload: { groups },
});

export const selectGroupProperty = (
  index: number,
  property: string
): GroupByActions => ({
  type: SELECT_GROUP_PROPERTY,
  payload: {
    index,
    property,
  },
});

export const removeGroup = (index: number): GroupByActions => ({
  type: REMOVE_GROUP,
  payload: { index },
});
