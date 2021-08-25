import sagaHelper from 'redux-saga-testing';
import { put, select } from 'redux-saga/effects';

import { saveQuery } from '../actions';
import { saveQuery as saveQueryFlow } from './saveQuery';
import { getQuerySettings, queriesActions } from '../../queries';
import { getVisualization } from '../selectors';

describe('saveQuery()', () => {
  const displayName = '@saved-query';
  const refreshRate = 0;
  const tags = [];
  const name = 'saved-query';
  const visualization = {
    type: 'metric',
    chartSettings: {},
    widgetSettings: {},
  };
  const query = {};
  const action = saveQuery(displayName, refreshRate, tags, name);
  const test = sagaHelper(
    saveQueryFlow(action as ReturnType<typeof saveQuery>)
  );

  test('selects query', (result) => {
    expect(result).toEqual(select(getQuerySettings));
    return query;
  });

  test('selects visualization', (result) => {
    expect(result).toEqual(select(getVisualization));
    return visualization;
  });

  test('saves query', (result) => {
    const body = {
      query,
      metadata: {
        displayName,
        visualization,
        tags,
      },
      refreshRate: refreshRate * 60 * 60,
    };

    expect(result).toEqual(put(queriesActions.saveQuery({ name, body })));
  });
});
