
var _ from 'lodash');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var ExtractionOptions from '../../../../../lib/js/app/components/explorer/query_builder/extraction_options.js');
var TestHelpers from '../../../../../test/support/TestHelpers');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/query_builder/extraction_options', () => {
  beforeEach(() => {
    var model = TestHelpers.createExplorerModel();
    this.defaultProps = {
      handleSelectionWithEvent: () => {},
      handleChange: () => {},
      setExtractionType: () => {},
      latest: model.query.latest,
      email: model.query.email,
      event_collection: model.query.event_collection,
      property_names: model.query.property_names,
      isEmail: false,
      projectSchema: {}
    };
    this.renderComponent = function(props) {
      var props = _.assign({}, this.defaultProps, props);
      return TestUtils.renderIntoDocument(<ExtractionOptions {...props} />);
    };
    this.component = this.renderComponent();
  });

  describe('an email extraction', () => {
    it('shows the email field', () => {
      var props = _.assign({}, this.component.props, { isEmail: true });
      this.component = TestHelpers.renderComponent(ExtractionOptions, props);

      assert.lengthOf($R(this.component).find('input[name="email"]').components, 1);
    });
    it('shows the latest field', () => {
      var props = _.assign({}, this.component.props, { isEmail: true });
      this.component = TestHelpers.renderComponent(ExtractionOptions, props);

      assert.lengthOf($R(this.component).find('LatestField').components, 1);
    });
  });

  describe('extraction properties filter', () => {
    it('shows when an extraction model is loaded', () => {
      const projectSchema = { 'test_collection': { sortedProperties: ["test_name"] } };
      const props = _.assign({}, this.component.props, { event_collection: 'test_collection', projectSchema: projectSchema });
      this.component = TestHelpers.renderComponent(ExtractionOptions, props);

      assert.lengthOf($R(this.component).find('ReactMultiSelect').components, 1);
    });

    it('is hidden when with all other types of models', () => {
      assert.lengthOf($R(this.component).find('ReactMultiSelect').components, 0);
    });
  });
});
