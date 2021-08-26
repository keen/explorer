import sagaHelper from 'redux-saga-testing';
import { saveExistingQuery as saveExistingQueryFlow } from './saveExistingQuery';
import { put, select, take } from 'redux-saga/effects';
import { savedQueryActions, savedQuerySelectors } from '../../savedQuery';
import { saveQuery } from '../actions';
import { appActions } from '../index';

describe('saveExistingQuery()', () => {
  const displayName = '@saved-query';
  const refreshRate = 0;
  const tags = [];
  const name = 'saved-query';

  describe('Scenario 1: Existing saved query is not used on any dashboards', () => {
    const test = sagaHelper(saveExistingQueryFlow());
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
        put(saveQuery(displayName, refreshRate, tags, name))
      );
    });
  });

  describe('Scenario 2: Existing saved query is used on dashboards', () => {
    const test = sagaHelper(saveExistingQueryFlow());
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
      expect(result).toEqual(put(appActions.showUpdateSavedQueryModal()));
    });
  });
});
