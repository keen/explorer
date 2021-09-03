/* eslint-disable @typescript-eslint/no-empty-function */
import sagaHelper from 'redux-saga-testing';
import { getContext, put, select, take } from 'redux-saga/effects';
import { NEW_QUERY_EVENT } from '@keen.io/query-creator';

import {
  setViewMode,
  resetVisualization,
  composeSavedQuery,
  showUpdateSavedQueryModal,
} from './actions';
import { getVisualization } from './selectors';
import { getQuerySettings, queriesActions } from '../queries';
import { savedQueryActions, savedQuerySelectors } from '../savedQuery';
import {
  createNewQuery as createNewQueryFlow,
  composeSavedQuery as composeSavedQueryFlow,
  validateDashboardsConnections as validateDashboardsConnectionsFlow,
} from './appSaga';

import { PUBSUB_CONTEXT } from '../../constants';

describe('createNewQuery()', () => {
  const test = sagaHelper(createNewQueryFlow());
  const pubsub = {
    publish: jest.fn(),
  };
  test('change application view to editor', (result) => {
    expect(result).toEqual(put(setViewMode('editor')));
  });

  test('get the PubSub from context', (result) => {
    expect(result).toEqual(getContext(PUBSUB_CONTEXT));
    return pubsub;
  });

  test('publish message to query creator', () => {
    expect(pubsub.publish).toBeCalledWith(NEW_QUERY_EVENT);
  });

  test('reset query results', (result) => {
    expect(result).toEqual(put(queriesActions.resetQueryResults()));
  });

  test('reset visualization settings', (result) => {
    expect(result).toEqual(put(resetVisualization()));
  });

  test('reset saved query settings', (result) => {
    expect(result).toEqual(put(savedQueryActions.resetSavedQuery()));
  });
});

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

describe('validateDashboardsConnections()', () => {
  const displayName = '@saved-query';
  const refreshRate = 0;
  const tags = [];
  const name = 'saved-query';

  describe('Scenario 1: Existing saved query is not used on any dashboards', () => {
    const test = sagaHelper(validateDashboardsConnectionsFlow());
    test('gets saved query', (result) => {
      expect(result).toEqual(select(savedQuerySelectors.getSavedQuery));
      return { displayName, refreshRate, tags, name };
    });

    test('gets dashboards connections', (result) => {
      expect(result).toEqual(
        put(savedQueryActions.getDashboardsConnection(name))
      );
    });

    test('waits till dashboards connection get is done', (result) => {
      expect(result).toEqual(
        take(savedQueryActions.getDashboardsConnectionDone.type)
      );
    });

    test('selects connected dashboards', (result) => {
      expect(result).toEqual(
        select(savedQuerySelectors.getConnectedDashboards)
      );
      return [];
    });

    test('selects connected dashboards error state', (result) => {
      expect(result).toEqual(
        select(savedQuerySelectors.getConnectedDashboardsError)
      );
      return false;
    });

    test('updates saved query', (result) => {
      expect(result).toEqual(
        put(composeSavedQuery(displayName, refreshRate, tags, name))
      );
    });
  });

  describe('Scenario 2: Existing saved query is used on dashboards', () => {
    const test = sagaHelper(validateDashboardsConnectionsFlow());
    const dashboards = [
      { title: '@dashboard-1', id: '@id-1' },
      { title: '@dashboard-2', id: '@id-2' },
      { title: '@dashboard-3', id: '@id-3' },
    ];
    test('gets saved query', (result) => {
      expect(result).toEqual(select(savedQuerySelectors.getSavedQuery));
      return { displayName, refreshRate, tags, name };
    });

    test('gets dashboards connections', (result) => {
      expect(result).toEqual(
        put(savedQueryActions.getDashboardsConnection(name))
      );
    });

    test('waits till dashboards connection get is done', (result) => {
      expect(result).toEqual(
        take(savedQueryActions.getDashboardsConnectionDone.type)
      );
    });

    test('selects connected dashboards', (result) => {
      expect(result).toEqual(
        select(savedQuerySelectors.getConnectedDashboards)
      );
      return dashboards;
    });

    test('selects connected dashboards error state', (result) => {
      expect(result).toEqual(
        select(savedQuerySelectors.getConnectedDashboardsError)
      );
      return false;
    });

    test('opens update saved query modal', (result) => {
      expect(result).toEqual(put(showUpdateSavedQueryModal()));
    });
  });
});
