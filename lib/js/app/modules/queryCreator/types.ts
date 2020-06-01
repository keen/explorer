import { SELECT_EVENT_COLLECTION, SELECT_ANALYSIS } from './constants';

import { Analysis } from '../../types';

export type ReducerState = {
  eventCollection?: string;
  analysis: Analysis;
};

export interface SelectEventCollectionAction {
  type: typeof SELECT_EVENT_COLLECTION;
  payload: {
    name: string;
  };
}

export interface SelectAnalysisAction {
  type: typeof SELECT_ANALYSIS;
  payload: {
    analysis: Analysis;
  };
}

export type QueryCreatorActions =
  | SelectEventCollectionAction
  | SelectAnalysisAction;
