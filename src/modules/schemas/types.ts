export type ReducerState = {
  eventStreams: {
    [key: string]: number;
  };
  notExistingEventStreams: string[];
};
