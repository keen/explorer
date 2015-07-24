/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var _ = require('lodash');
var sinon = require('sinon');
var Persistence = require('../../../../client/js/app/modules/persistence/persistence.js');
var RESTPersistence = require('../../../../client/js/app/modules/persistence/REST.js');

describe('modules/persistence/persistence', function(){

  before(function () {
    this.persistence = Persistence;
  });

  it('exists', function(){
    assert.isDefined(Persistence);
  });

  it('has a REST key equal to the RESTPersistence class', function(){
    assert.equal(Persistence.REST, RESTPersistence);
  });
});