const assert from 'chai').assert;
const sinon from 'sinon/pkg/sinon.js');
const React from 'react');
const ReactDOM from 'react-dom');
const $R from 'rquery')(_, React, ReactDOM, TestUtils);
const TestUtils from 'react-addons-test-utils');

const ReactMultiSelect from '../../../../lib/js/app/components/common/react_multi_select.js');
const TestHelpers from '../../../support/TestHelpers');

describe('components/common/react_multi_select', () => {
  before(() => {
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

  it('is of right type', () => {
    assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, ReactMultiSelect));
  });

  it('displays correct number of options', () => {
    const options = ReactDOM.findDOMNode(this.component.refs.menu).childNodes;

    assert.equal(options.length, 3);
  });

  it('calls handleChange function when selection is made', () => {
    const options = ReactDOM.findDOMNode(this.component.refs.menu).childNodes;
    TestUtils.Simulate.click(options[0]);

    assert.isTrue(this.handleChangeStub.called);
  });

});
