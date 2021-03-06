import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerState } from './types';

export const initialState: ReducerState = {
  eventStreams: {},
  notExistingEventStreams: [],
};

export const schemasSlice = createSlice({
  name: 'schemas',
  initialState,
  reducers: {
    setEventStreamProperties: (
      state,
      {
        payload,
      }: PayloadAction<{ eventStream: string; propertiesCount: number }>
    ) => {
      const { eventStream, propertiesCount } = payload;
      state.eventStreams[eventStream] = propertiesCount;
    },
    addNotExistingEventStream: (state, { payload }: PayloadAction<string>) => {
      state.notExistingEventStreams.push(payload);
    },
  },
});
