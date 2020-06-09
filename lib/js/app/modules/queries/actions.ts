import { QueriesActions } from './types';

import { CREATE_NEW_QUERY } from './constants';

export const createNewQuery = (): QueriesActions => ({
  type: CREATE_NEW_QUERY,
});
