import  _ from 'lodash';
import ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils.js';
import ReactSelect from '../../../../lib/js/app/components/common/react_select.js';
import ReactMultiSelect from '../../../../lib/js/app/components/common/react_multi_select.js';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TestHelpers from '../../../support/TestHelpers';
import rquery from 'rquery';
const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/common/react_multi_select', () => {
  let handleChangeStub;
  let component;
  beforeAll(() => {
    handleChangeStub = jest.fn();
    const props = {
      name: 'filter-properties',
      model: TestHelpers.createExplorerModel(),
      label: "Filter extraction properties",
      handleChange: handleChangeStub,
      items: ['name', 'email', 'user.id']
    }

    component = TestUtils.renderIntoDocument(<ReactMultiSelect {...props} />);
  });

  it('is of right type', () => {
    expect(TestUtils.isCompositeComponentWithType(component, ReactMultiSelect)).toBe(true);
  });

  it('displays correct number of options', () => {
    const options = ReactDOM.findDOMNode(component.refs.menu).childNodes;

    expect(options.length).toBe(3);
  });

  it('calls handleChange function when selection is made', () => {
    const options = ReactDOM.findDOMNode(component.refs.menu).childNodes;
    TestUtils.Simulate.click(options[0]);

    expect(handleChangeStub).toHaveBeenCalled();
  });

});
