
import React from 'react';
var TestUtils from 'react-addons-test-utils');
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var Persistence from '../../../../lib/js/app/modules/persistence/persistence.js');
var KeenSavedQueries from '../../../../lib/js/app/modules/persistence/KeenSavedQueries.js');

describe('modules/persistence/persistence', () => {

  before(() => {
    this.persistence = Persistence;
  });

  it('exists', () => {
    assert.isDefined(Persistence);
  });

  it('has a KeenSavedQueries key equal to the KeenSavedQueries class', () => {
    assert.equal(Persistence.KeenSavedQueries, KeenSavedQueries);
  });
});
