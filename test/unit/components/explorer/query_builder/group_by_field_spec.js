
var expect from 'chai').expect;
let sinon from 'sinon/pkg/sinon.js');
var _ from 'lodash');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var GroupByField from '../../../../../lib/js/app/components/explorer/query_builder/group_by_field.js');
var TestHelpers from '../../../../../test/support/TestHelpers');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/query_builder/group_by_field', () => {
  beforeEach(() => {
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

  describe('with a single group by', () => {
    it('shows one input', () => {
      assert.lengthOf($R(this.component).find('.group-by').components, 1);
    });
    it('shows the correct toggle button text', () => {
      assert.strictEqual($R(this.component).find('a').components[1].innerText, "Group by a second property");
    });
  });
  describe('with a double group by', () => {
    beforeEach(() => {
      this.component = this.renderComponent({
        value: ['one', 'two']
      });
    })
    it('shows two inputs', () => {
      assert.lengthOf($R(this.component).find('.group-by').components, 2);
    });
    it('shows the correct toggle button text', () => {
      assert.strictEqual($R(this.component).find('a').components[1].innerText, "Remove second property");
    });
  });
  describe('toggle link', () => {
    it('should call props.handleChange with an empty string array value at index 1 if the value is an empty array', () => {
      this.component = this.renderComponent({
        value: []
      });
      TestUtils.Simulate.click($R(this.component).find('a').components[1]);
      assert.sameMembers(this.handleChangeStub.getCall(0).args[1], ['', '']);
    });
    it('should call props.handleChange with an empty string array value at index 1 if there is only one group by', () => {
      this.component = this.renderComponent({
        value: ['one']
      });
      TestUtils.Simulate.click($R(this.component).find('a').components[1]);
      assert.sameMembers(this.handleChangeStub.getCall(0).args[1], ['one', '']);
    });
    it('should call props.handleChange with a single item array if there is two values', () => {
      this.component = this.renderComponent({
        value: ['one', 'two']
      });
      TestUtils.Simulate.click($R(this.component).find('a').components[1]);
      assert.sameMembers(this.handleChangeStub.getCall(0).args[1], ['one']);
    });
  });
});
