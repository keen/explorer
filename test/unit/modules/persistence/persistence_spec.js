/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var _ = require('lodash');
var sinon = require('sinon');
var Persistence = require('../../../../client/js/app/modules/persistence/persistence.js');
var KeenSavedQueries = require('../../../../client/js/app/modules/persistence/KeenSavedQueries.js');

describe('modules/persistence/persistence', function(){

  before(function () {
    this.persistence = Persistence;
  });

  it('exists', function(){
    assert.isDefined(Persistence);
  });

  it('has a KeenSavedQueries key equal to the KeenSavedQueries class', function(){
    assert.equal(Persistence.KeenSavedQueries, KeenSavedQueries);
  });
});
