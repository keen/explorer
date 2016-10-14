var KeenVizConfig = require('../../../../../client/js/app/components/explorer/visualization/keen_viz_config.js');
var assert = require('chai').assert;
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var TestHelpers = require('../../../../support/TestHelpers');

describe('components/explorer/visualization/keen_viz_config', function() {

  beforeEach(function() {
    this.component = TestUtils.renderIntoDocument(<KeenVizConfig />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, KeenVizConfig));
    });

  });

});
