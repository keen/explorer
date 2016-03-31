/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var GroupByField = require('../../../../../client/js/app/components/explorer/query_builder/group_by_field.jsx');
var TestHelpers = require('../../../../../test/support/TestHelpers');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/query_builder/group_by_field', function() {
  beforeEach(function() {
    this.handleChangeStub = sinon.stub();
    this.defaultProps = {
      handleChange: this.handleChangeStub,
      value: ['one']
    };
    this.renderComponent = function(props) {
      var props = _.assign({}, this.defaultProps, props);
      return TestUtils.renderIntoDocument(<GroupByField {...props} />);
    };
    this.component = this.renderComponent();
  });

  describe('with a single group by', function () {
    it('shows one input', function() {
      assert.lengthOf($R(this.component).find('.group-by').components, 1);
    });
    it('shows the correct toggle button text', function() {
      assert.strictEqual($R(this.component).find('a').components[1].innerText, "Group by a second property");
    });
  });
  describe('with a double group by', function () {
    beforeEach(function(){
      this.component = this.renderComponent({
        value: ['one', 'two']
      });
    })
    it('shows two inputs', function() {
      assert.lengthOf($R(this.component).find('.group-by').components, 2);
    });
    it('shows the correct toggle button text', function() {
      assert.strictEqual($R(this.component).find('a').components[1].innerText, "Remove second property");
    });
  });
  describe('toggle link', function () {
    it('should call props.handleChange with an empty string array value at index 1 if the value is an empty array', function () {
      this.component = this.renderComponent({
        value: []
      });
      TestUtils.Simulate.click($R(this.component).find('a').components[1]);
      assert.sameMembers(this.handleChangeStub.getCall(0).args[1], ['', '']);
    });
    it('should call props.handleChange with an empty string array value at index 1 if there is only one group by', function () {
      this.component = this.renderComponent({
        value: ['one']
      });
      TestUtils.Simulate.click($R(this.component).find('a').components[1]);
      assert.sameMembers(this.handleChangeStub.getCall(0).args[1], ['one', '']);
    });
    it('should call props.handleChange with a single item array if there is two values', function () {
      this.component = this.renderComponent({
        value: ['one', 'two']
      });
      TestUtils.Simulate.click($R(this.component).find('a').components[1]);
      assert.sameMembers(this.handleChangeStub.getCall(0).args[1], ['one']);
    });
  });
});
