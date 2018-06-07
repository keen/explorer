
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import _ from 'lodash';
import Persistence from '../../../../lib/js/app/modules/persistence/persistence.js';
import KeenSavedQueries from '../../../../lib/js/app/modules/persistence/KeenSavedQueries.js';

describe('modules/persistence/persistence', () => {
  let persistanceObj;

  beforeAll(() => {
    persistanceObj = Persistence;
  });

  it('exists', () => {
    expect(persistanceObj).not.toBe(undefined);
  });

  it('has a KeenSavedQueries key equal to the KeenSavedQueries class', () => {
    expect(Persistence.KeenSavedQueries).toEqual(KeenSavedQueries);
  });
});
