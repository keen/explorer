var KeenVizConfig = require('../../../../../client/js/app/components/explorer/visualization/keen_viz_config.js');
var assert = require('chai').assert;
var React = require('react');
var ReactDOM = require('react-dom');
var sinon = require('sinon');
var TestUtils = require('react-addons-test-utils');
var TestHelpers = require('../../../../support/TestHelpers');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/visualization/keen_viz_config', function() {

  beforeEach(function() {
    this.component = TestUtils.renderIntoDocument(<KeenVizConfig />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, KeenVizConfig));
    });
  });

  describe('button callbacks', function() {
    it('calls toggleVizConfig when the x button is clicked', function () {
      var stub = sinon.stub();
      this.component = this.renderComponent({ toggleVizConfig: stub });
      TestUtils.Simulate.click($R(this.component).find('[role="close-viz-config"]').components[0]);
      assert.isTrue(stub.calledOnce);
    });
  });

});

