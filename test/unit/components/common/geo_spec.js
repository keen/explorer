
let sinon from 'sinon/pkg/sinon.js');
var _ from 'lodash');
import React from 'react';
var TestUtils from 'react-addons-test-utils');
var Geo from '../../../../lib/js/app/components/common/geo.js');
var TestHelpers from '../../../support/TestHelpers');

describe('components/common/geo', () => {
  before(() => {
    this.filter = TestHelpers.createFilters().geo;
    this.component = TestUtils.renderIntoDocument(<Geo filter={this.filter} handleGeoSelection={sinon.stub} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Geo));
    });
  });
  it('has three inputs', () => {
    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 3);
  });
});
