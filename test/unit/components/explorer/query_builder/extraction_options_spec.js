
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ExtractionOptions from '../../../../../lib/js/app/components/explorer/query_builder/extraction_options.js';
import TestHelpers from '../../../../../test/support/TestHelpers';
import rquery from 'rquery';

const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/explorer/query_builder/extraction_options', () => {
  let defaultProps;
  let renderComponent;
  let component;
  beforeEach(() => {
    const model = TestHelpers.createExplorerModel();
    defaultProps = {
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
    renderComponent = function(props) {
      let propsExt = _.assign({}, defaultProps, props);
      return TestUtils.renderIntoDocument(<ExtractionOptions {...propsExt} />);
    };
    component = renderComponent();
  });

  describe('an email extraction', () => {
    it('shows the email field', () => {
      let props = _.assign({}, component.props, { isEmail: true });
      component = TestHelpers.renderComponent(ExtractionOptions, props);

      expect($R(component).find('input[name="email"]').components).toHaveLength(1);
    });
    it('shows the latest field', () => {
      let props = _.assign({}, component.props, { isEmail: true });
      component = TestHelpers.renderComponent(ExtractionOptions, props);

      expect($R(component).find('LatestField').components).toHaveLength(1);
    });
  });

  describe('extraction properties filter', () => {
    it('shows when an extraction model is loaded', () => {
      const projectSchema = { 'test_collection': { sortedProperties: ["test_name"] } };
      const props = _.assign({}, component.props, { event_collection: 'test_collection', projectSchema: projectSchema });
      component = TestHelpers.renderComponent(ExtractionOptions, props);

      expect($R(component).find('ReactMultiSelect').components).toHaveLength(1);
    });

    it('is hidden when with all other types of models', () => {
      expect($R(component).find('ReactMultiSelect').components).toHaveLength(0);
    });
  });
});
