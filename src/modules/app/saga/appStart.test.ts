/* eslint-disable @typescript-eslint/camelcase */

import sagaHelper from 'redux-saga-testing';
import { call, put, spawn } from 'redux-saga/effects';

import { appActions } from '../index';

import { appStart as appStartFlow } from './appStart';
import { getOrganizationUsageLimits, queriesActions } from '../../queries';
import { watchScreenResize } from './watchScreenResize';
import { rehydrateAutorunSettings } from './rehydrateAutorunSettings';
import { loadSharedQuery } from './loadSharedQuery';

describe('appStart()', () => {
  const action = appActions.appStart({
    initialView: 'editor',
    savedQuery: null,
  });

  describe('Scenario 1: Persisted state', () => {
    jest
      .spyOn(URLSearchParams.prototype, 'get')
      .mockImplementationOnce(() => 'state');

    function* wrapper() {
      return yield* appStartFlow(action);
    }

    const test = sagaHelper(wrapper());
    test('gets organisation use limits', (result) => {
      expect(result).toEqual(put(getOrganizationUsageLimits()));
    });

    test('fetches saved queries', (result) => {
      expect(result).toEqual(put(queriesActions.fetchSavedQueries()));
    });

    test('calls load share query state', (result) => {
      expect(result).toEqual(call(loadSharedQuery, 'state'));
    });

    test('puts screen dimensions', (result) => {
      expect(result).toEqual(
        put(appActions.setScreenDimension({ width: 1024, height: 768 }))
      );
    });

    test('spawns settings rehydrate', (result) => {
      expect(result).toEqual(spawn(rehydrateAutorunSettings));
    });

    test('spawns screen resize watcher', (result) => {
      expect(result).toEqual(spawn(watchScreenResize));
    });
  });

  describe('Scenario 2: Not persisted state', () => {
    function* wrapper() {
      return yield* appStartFlow(action);
    }

    const test = sagaHelper(wrapper());
    test('gets organisation use limits', (result) => {
      expect(result).toEqual(put(getOrganizationUsageLimits()));
    });

    test('fetches saved queries', (result) => {
      expect(result).toEqual(put(queriesActions.fetchSavedQueries()));
      return [];
    });

    test('puts screen dimensions', (result) => {
      expect(result).toEqual(
        put(appActions.setScreenDimension({ width: 1024, height: 768 }))
      );
    });

    test('spawns settings rehydrate', (result) => {
      expect(result).toEqual(spawn(rehydrateAutorunSettings));
    });

    test('spawns screen resize watcher', (result) => {
      expect(result).toEqual(spawn(watchScreenResize));
    });
  });
});
