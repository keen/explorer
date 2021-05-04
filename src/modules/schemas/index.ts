import { fetchEventStreamSchema } from './actions';
import { fetchEventStreamProperties } from './saga';
import { schemasSlice } from './reducer';
import { getEventStreamProperties } from './selectors';
import { ReducerState } from './types';

const schemasReducer = schemasSlice.reducer;

const schemasActions = {
  fetchEventStreamSchema,
  ...schemasSlice.actions,
};

export {
  ReducerState,
  schemasActions,
  schemasReducer,
  fetchEventStreamProperties,
  getEventStreamProperties,
};
