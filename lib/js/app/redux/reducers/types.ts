type QueriesState = {
  isSavingQuery: boolean;
  isLimited: boolean;
};

export type ApplicationState = {
  queries: QueriesState;
};
