
import React from 'react';
import _ from 'lodash';
import TestUtils from 'react-addons-test-utils';
import TestHelpers from '../../../support/TestHelpers';

import ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions';
import TimeframeUtils from '../../../../lib/js/app/utils/TimeframeUtils';
import ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils';
import Timezone from '../../../../lib/js/app/components/common/timezone.js';

describe('components/common/timezone', () => {
  let handleChangeStub;
  let model;
  let component;

  beforeAll(() => {
    handleChangeStub = jest.fn();
  });


  beforeEach(() => {
    handleChangeStub.mockClear();
    model = TestHelpers.createExplorerModel();
    component = TestUtils.renderIntoDocument(<Timezone timezone={model.query.timezone}
                                                            timeframe_type={TimeframeUtils.timeframeType(model.query.time)}
                                                            handleChange={handleChangeStub} />);
  });

  it('should use the value from the project config if it matches the value', () => {
    const timezoneInput = component.refs.timezone.refs.input;
    timezoneInput.value = 'US/Hawaii';
    TestUtils.Simulate.change(timezoneInput);
    expect(handleChangeStub.mock.calls[0][1]).toEqual('US/Hawaii');
  });

  it('should allow a custom value if there is no match in the project config', () => {
    const timezoneInput = component.refs.timezone.refs.input;
    timezoneInput.value = '-27000';
    TestUtils.Simulate.change(timezoneInput);
    expect(handleChangeStub.mock.calls[0][1]).toEqual('-27000');
  });

  it('should allow a custom value if there is no match in the project config', () => {
    const props = _.assign({}, component.props, { timezone: 'US/Hawaii' });
    component = TestHelpers.renderComponent(Timezone, props);
    const inputValue = component.refs.timezone.refs.input.value;

    expect(inputValue).toEqual('US/Hawaii');
  });
});
