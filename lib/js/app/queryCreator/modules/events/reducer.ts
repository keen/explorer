import { ReducerState, EventsActions } from './types';

import { createTree, createCollection } from '../../utils';

import {
  SET_EVENTS_COLLECTIONS,
  SET_COLLETION_SCHEMA_LOADING,
  FETCH_COLLECTION_SCHEMA_SUCCESS,
} from './constants';

export const initialState: ReducerState = {
  collections: [],
  loadingSchemas: [],
  schemas: {},
};

export const eventsReducer = (
  state: ReducerState = initialState,
  action: EventsActions
) => {
  switch (action.type) {
    case SET_COLLETION_SCHEMA_LOADING:
      return {
        ...state,
        loadingSchemas: action.payload.isLoading
          ? [...state.loadingSchemas, action.payload.colletion]
          : state.loadingSchemas.filter(
              (collection) => collection !== action.payload.colletion
            ),
      };
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
