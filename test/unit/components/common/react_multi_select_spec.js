const assert = require('chai').assert;
const sinon = require('sinon/pkg/sinon.js');
const React = require('react');
const ReactDOM = require('react-dom');
const $R = require('rquery')(_, React, ReactDOM, TestUtils);
const TestUtils = require('react-addons-test-utils');

const ReactMultiSelect = require('../../../../client/js/app/components/common/react_multi_select.js');
const TestHelpers = require('../../../support/TestHelpers');

describe('components/common/react_multi_select', function() {
  before(function() {
    this.handleChangeStub = sinon.stub();
    const props = {
      name: 'filter-properties',
      model: TestHelpers.createExplorerModel(),
      label: "Filter extraction properties",
      handleChange: this.handleChangeStub,
      items: ['name', 'email', 'user.id']
    }

    this.component = TestUtils.renderIntoDocument(<ReactMultiSelect {...props} />);
  });

  it('is of right type', function() {
    assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, ReactMultiSelect));
  });

  it('displays correct number of options', function() {
    const options = ReactDOM.findDOMNode(this.component.refs.menu).childNodes;

    assert.equal(options.length, 3);
  });

  it('calls handleChange function when selection is made', function() {
    const options = ReactDOM.findDOMNode(this.component.refs.menu).childNodes;
    TestUtils.Simulate.click(options[0]);

    assert.isTrue(this.handleChangeStub.called);
  });

});
