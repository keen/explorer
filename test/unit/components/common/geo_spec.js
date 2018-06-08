import _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Geo from '../../../../lib/js/app/components/common/geo.js';
import TestHelpers from '../../../support/TestHelpers';

describe('components/common/geo', () => {
  let filter;
  let component;
  beforeAll(() => {
    filter = TestHelpers.createFilters().geo;
    component = TestUtils.renderIntoDocument(<Geo filter={filter} handleGeoSelection={jest.fn()} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, Geo)).toBe(true);
    });
  });
  it('has three inputs', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')).toHaveLength(3);
  });
});
