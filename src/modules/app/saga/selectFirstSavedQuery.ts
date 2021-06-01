/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-unused-vars */
import { put, select } from 'redux-saga/effects';

import { selectFirstSavedQuery as selectFirstSavedQueryAction } from '../actions';

import {
  queriesActions,
  queriesSelectors,
  SavedQueryListItem,
} from '../../queries';
import { savedQueryActions } from '../../savedQuery';

/**
 * Flow responsible for selecting first query from the browser list
 *
 * @return void
 *
 */
export function* selectFirstSavedQuery(
  _action?: ReturnType<typeof selectFirstSavedQueryAction>
) {
  const savedQueries: SavedQueryListItem[] = yield select(
    queriesSelectors.getSavedQueries
  );

  if (savedQueries.length) {
    const sortedQueries: SavedQueryListItem[] = [...savedQueries].sort(
      (a: SavedQueryListItem, b: SavedQueryListItem) => {
        const nameA = a.displayName.toLowerCase();
        const nameB = b.displayName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }
    );

    const [firstQuery] = sortedQueries;
    const { name, query } = firstQuery;
    yield put(savedQueryActions.selectSavedQuery(name));
    yield put(queriesActions.setQuerySettings({ settings: query }));
  }
}
