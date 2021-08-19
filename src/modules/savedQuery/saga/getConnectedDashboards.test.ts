/* eslint-disable @typescript-eslint/camelcase */

import sagaHelper from 'redux-saga-testing';
import { getContext, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';
import { getConnectedDashboards } from './getConnectedDashboards';
import {
  DASHBOARDS_API_CONTEXT,
  KEEN_CLIENT_CONTEXT,
} from '../../../constants';
import { savedQueryActions } from '../index';

describe('getConnectedDashboards', () => {
  const savedQuery = 'saved-query';

  describe('Scenario 1: Dashboards API url is not provided', () => {
    const test = sagaHelper(getConnectedDashboards(savedQuery));

    test('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      return {
        config: { readKey: '@readKey', projectId: '@projectId' },
      };
    });

    test('get the Dashboards API context', (result) => {
      expect(result).toEqual(getContext(DASHBOARDS_API_CONTEXT));

      return {
        dashboardsApi: null,
      };
    });
  });

  describe('Scenario 2: Dashboards API url is provided and returns connected dashboards', () => {
    const test = sagaHelper(getConnectedDashboards(savedQuery));

    const dashboardsMeta = [
      {
        id: '@id',
        title: '@title',
        widgets: 3,
        queries: 1,
        tags: [],
        lastModificationDate: 1,
        isPublic: false,
        publicAccessKey: null,
      },
    ];

    const apiResonse: Partial<Response> = {
      status: HttpStatus.OK,
      json: () => Promise.resolve(dashboardsMeta),
    };

    test('get the Keen API client instance from context', (result) => {
      expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

      return {
        config: { readKey: '@readKey', projectId: '@projectId' },
      };
    });

    test('get the Dashboards API context', (result) => {
      expect(result).toEqual(getContext(DASHBOARDS_API_CONTEXT));

      return {
        dashboardsApi: '@dashboardsApi',
      };
    });

    test('reset connected dashboards list', (result) => {
      expect(result).toEqual(
        put(savedQueryActions.updateConnectedDashboards(null))
      );
    });

    test('set connected dashboards error state', (result) => {
      expect(result).toEqual(
        put(savedQueryActions.setConnectedDashboardsError(false))
      );
    });

    test('set connected dashboards loading state', (result) => {
      expect(result).toEqual(
        put(savedQueryActions.setConnectedDashboardsLoading(true))
      );
    });

    test('performs request to fetch connected dashboards', () => {
      return apiResonse;
    });

    test('parse JSON response', () => {
      return dashboardsMeta;
    });

    test('update connected dashboards', (result) => {
      const dashboards = dashboardsMeta.map(({ id, title }) => ({ id, title }));
      expect(result).toEqual(
        put(savedQueryActions.updateConnectedDashboards(dashboards))
      );
    });
  });
});
