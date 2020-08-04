import {
  ADD_GROUP,
  REMOVE_GROUP,
  SELECT_GROUP_PROPERTY,
  RESET_GROUPS,
  SET_GROUPS,
} from './constants';

export type Group = {
  id: string;
  property: string | null;
  chosen?: boolean;
  filtered?: boolean;
};

interface AddGroupAction {
  type: typeof ADD_GROUP;
  payload: {
    property: string;
  };
}

interface SelectGroupPropertyAction {
  type: typeof SELECT_GROUP_PROPERTY;
  payload: {
    id: string;
    property: string;
  };
}

interface SetGroupsAction {
  type: typeof SET_GROUPS;
  payload: { groups: Group[] };
}

interface RemoveGroupAction {
  type: typeof REMOVE_GROUP;
  payload: { id: string };
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
