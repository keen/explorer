import { ApplicationState } from '../reducers';

export const getQueriesSaving = ({ queries }: ApplicationState) =>
  queries.isSavingQuery;

export const getQueriesLimit = ({ queries }: ApplicationState) =>
  queries.isLimited;
