import {
  ADD_GROUP,
  REMOVE_GROUP,
  SELECT_GROUP_PROPERTY,
  RESET_GROUPS,
  SET_GROUPS,
} from './constants';

export type Group = {
  property?: string;
};

interface AddGroupAction {
  type: typeof ADD_GROUP;
}

interface SelectGroupPropertyAction {
  type: typeof SELECT_GROUP_PROPERTY;
  payload: {
    index: number;
    property: string;
  };
}

interface SetGroupsAction {
  type: typeof SET_GROUPS;
  payload: { groups: string[] };
}

interface RemoveGroupAction {
  type: typeof REMOVE_GROUP;
  payload: { index: number };
}

interface ResetGroupsAction {
  type: typeof RESET_GROUPS;
}

export type GroupByActions =
  | AddGroupAction
  | RemoveGroupAction
  | SetGroupsAction
  | SelectGroupPropertyAction
  | ResetGroupsAction;
