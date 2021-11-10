import { composeSavedQuery } from '../actions';
import sagaHelper from 'redux-saga-testing';
import { composeSavedQuery as composeSavedQueryFlow } from './composeSavedQuery';
import { put, select } from 'redux-saga/effects';
import { getQuerySettings, queriesActions } from '../../queries';
import { getVisualization } from '../selectors';

describe('composeSavedQuery()', () => {
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
  const action = composeSavedQuery(displayName, refreshRate, tags, name);
  const test = sagaHelper(
    composeSavedQueryFlow(action as ReturnType<typeof composeSavedQuery>)
  );

  test('selects query', (result) => {
    expect(result).toEqual(select(getQuerySettings));
    return query;
  });

  test('selects visualization', (result) => {
    expect(result).toEqual(select(getVisualization));
    return visualization;
  });

  test('composes saved query and saves it', (result) => {
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
