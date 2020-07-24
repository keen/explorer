import { ReducerState, EventsActions } from './types';

import { createTree } from '../../utils/createTree';
import { createCollection } from '../../utils/createCollection';

import {
  SET_EVENTS_COLLECTIONS,
  FETCH_COLLECTION_SCHEMA_SUCCESS,
} from './constants';

export const initialState: ReducerState = {
  collections: [],
  schemas: {},
};

export const eventsReducer = (
  state: ReducerState = initialState,
  action: EventsActions
) => {
  switch (action.type) {
    case FETCH_COLLECTION_SCHEMA_SUCCESS:
      return {
        ...state,
        schemas: {
          ...state.schemas,
          [action.payload.collection]: {
            schema: action.payload.schema,
            tree: createTree(action.payload.schema),
            list: createCollection(action.payload.schema),
          },
        },
      };
    case SET_EVENTS_COLLECTIONS:
      return {
        ...state,
        collections: action.payload.collections,
      };
    default:
      return state;
  }
};
