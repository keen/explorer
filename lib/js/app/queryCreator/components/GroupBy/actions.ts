import {
  ADD_GROUP,
  SELECT_GROUP_PROPERTY,
  REMOVE_GROUP,
  RESET_GROUPS,
  SET_GROUPS,
} from './constants';

import { Group, GroupByActions } from './types';

export const resetGroups = (): GroupByActions => ({
  type: RESET_GROUPS,
});

export const addGroup = (property: string): GroupByActions => ({
  type: ADD_GROUP,
  payload: {
    property,
  },
});

export const setGroups = (groups: Group[]): GroupByActions => ({
  type: SET_GROUPS,
  payload: { groups },
});

export const selectGroupProperty = (
  id: string,
  property: string
): GroupByActions => ({
  type: SELECT_GROUP_PROPERTY,
  payload: {
    id,
    property,
  },
});

export const removeGroup = (id: string): GroupByActions => ({
  type: REMOVE_GROUP,
  payload: { id },
});
