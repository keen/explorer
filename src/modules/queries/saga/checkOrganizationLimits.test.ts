/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { getContext, put } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';

import { checkOrganizationLimits } from './checkOrganizationLimits';
import { queriesSlice } from '../reducer';

import { KEEN_CLIENT_CONTEXT } from '../../../constants';

describe('Scenario 1: Get information about organization limits', () => {
  const test = sagaHelper(checkOrganizationLimits());

  const organizationLimits = {
    cached_queries: { limited: true, limit: 5, current_usage: 6 },
  };

  const apiResonse: Partial<Response> = {
    status: HttpStatus.OK,
    json: () => Promise.resolve(organizationLimits),
  };

  test('get the Keen API client instance from context', (result) => {
    expect(result).toEqual(getContext(KEEN_CLIENT_CONTEXT));

    return {
      url: () => '@url',
      config: { masterKey: '@masterKey' },
    };
  });

  test('performs request to fetch organization resources usage', () => {
    return apiResonse;
  });

  test('parse JSON response', () => {
    return organizationLimits;
  });

  test('notifies user that limit of cached queries exceed', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setCacheQueryLimitExceed({ limitReached: true }))
    );
  });

  test('set cached queries limit', (result) => {
    expect(result).toEqual(
      put(queriesSlice.actions.setCacheQueryLimit({ limit: 5 }))
    );
  });
});
