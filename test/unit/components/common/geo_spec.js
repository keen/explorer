/** @jsx React.DOM */
var assert = require('chai').assert;
var sinon = require('sinon');
var _ = require('lodash');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var Geo = require('../../../../client/js/app/components/common/geo.js');
var TestHelpers = require('../../../support/TestHelpers');

describe('components/common/geo', function() {
  before(function() {
    this.filter = TestHelpers.createFilters().geo;
    this.component = TestUtils.renderIntoDocument(<Geo filter={this.filter} handleGeoSelection={sinon.stub} />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Geo));
    });
  });
  it('has three inputs', function(){
    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 3);
  });
});
