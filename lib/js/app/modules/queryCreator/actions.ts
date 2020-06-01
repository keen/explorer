import { SELECT_EVENT_COLLECTION, SELECT_ANALYSIS } from './constants';

import { QueryCreatorActions } from './types';
import { Analysis } from '../../types';

export const selectEventCollection = (name: string): QueryCreatorActions => ({
  type: SELECT_EVENT_COLLECTION,
  payload: {
    name,
  },
});

export const selectAnalysis = (analysis: Analysis): QueryCreatorActions => ({
  type: SELECT_ANALYSIS,
  payload: {
    analysis,
  },
});
