import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';

import QueryActions from '../../../../lib/js/app/components/explorer/query_actions.js';
import TestHelpers from '../../../support/TestHelpers';

const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/explorer/query_actions', () => {
  let model;
  let handleSubmitStub;
  let handleRevertStub;
  let defaultProps;
  let renderComponent;
  let component;

  beforeEach(() => {
    model = TestHelpers.createExplorerModel();
    model.metadata.user = { id: 1 };
    model.metadata.display_name = 'A saved query name';
    handleSubmitStub = jest.fn();
    handleRevertStub = jest.fn();

    defaultProps = {
      handleQuerySubmit: handleSubmitStub,
      model: model,
      handleRevertChanges: handleRevertStub,
      persistence: null,
      user: { id: 1 },
      removeClick: () => {}
    };
    renderComponent = function(props) {
      let propsExt = _.assign({}, defaultProps, props);
      return TestUtils.renderIntoDocument(<QueryActions {...propsExt} />);
    };
    component = renderComponent();
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, QueryActions)).toBe(true);
    });

    describe('buttons shown', () => {
      describe('default buttons', () => {
        it('has the run-query button', () => {
          expect($R(component).find('[role="run-query"]').components).toHaveLength(1);
        });
      });
      describe('dynamic buttons', () => {
        describe('without persistence', () => {
          it('does not show the save button if persistence is null', () => {
            expect($R(component).find('[role="save-query"]').components).toHaveLength(0);
          });
          it('does not show the delete button if persistence is null', () => {
            expect($R(component).find('[role="delete-query"]').components).toHaveLength(0);
          });
          it('does not show the clone button if persistence is null', () => {
            expect($R(component).find('[role="clone-query"]').components).toHaveLength(0);
          });
        });
        describe('with persistence', () => {
          it('does show the save button', () => {
            component = renderComponent({ persistence: {} });
            expect($R(component).find('[role="save-query"]').components).toHaveLength(1);
          });
          it('does show the delete button', () => {
            component = renderComponent({ persistence: {} });
            expect($R(component).find('[role="delete-query"]').components).toHaveLength(1);
          });
          it('does show the clone button', () => {
            component = renderComponent({ persistence: {} });
            expect($R(component).find('[role="clone-query"]').components).toHaveLength(1);
          });
          describe('if the query is an email extraction', () => {
            it('the save button is disabled', () => {
              const model = TestHelpers.createExplorerModel();
              model.query.analysis_type = 'extraction';
              model.query.email = 'someone@keen.io';
              component = renderComponent({
                model: model,
                persistence: {}
              });
              expect($R(component).find('[role="save-query"]').components[0].disabled).toBe(true);
            });
          });
        });
      });
    });
  });

  describe('button callbacks', () => {
    it('calls handleQuerySubmit when the run query button is clicked', () => {
      const stub = jest.fn();
      component = renderComponent({ handleQuerySubmit: stub });
      TestUtils.Simulate.click($R(component).find('[role="run-query"]').components[0]);
      expect(stub).toBeCalled();
    });
    it('calls saveQueryClick when the save query button is clicked', () => {
      const stub = jest.fn();
      component = renderComponent({ persistence: {}, saveQueryClick: stub });
      TestUtils.Simulate.click($R(component).find('[role="save-query"]').components[0]);
      expect(stub).toBeCalled();
    });
    it('calls removeClick when the delete query button is clicked', () => {
      const stub = jest.fn();
      component = renderComponent({ persistence: {}, removeClick: stub });
      TestUtils.Simulate.click($R(component).find('[role="delete-query"]').components[0]);
      expect(stub).toBeCalled();
    });
    it('calls toggleCodeSample when the embed button is clicked', () => {
      const stub = jest.fn();
      component = renderComponent({ toggleCodeSample: stub });
      TestUtils.Simulate.click($R(component).find('[role="toggle-code-sample"]').components[0]);
      expect(stub).toBeCalled();
    });
  });

  describe('Button text', () => {

    it('returns \'Run model\' when model is not loading', () => {
      model.loading = false;
      component.forceUpdate();
      expect($R(component).find('[role="run-query"]').text()).toEqual('Run Query');
    });

    it('returns \'Running...\' when model is loading', () => {
      component.props.model.loading = true;
      component.forceUpdate();
      expect($R(component).find('[role="run-query"]').text()).toEqual('Running...');
    });

    describe('extractions', () => {
      beforeEach(() => {
        model.query.analysis_type = 'extraction';
      });

      it('returns \'Run Extraction\' when no email is present in the model', () => {
        model.loading = false;
        component.forceUpdate();
        expect($R(component).find('[role="run-query"]').text()).toEqual('Run Extraction');
      });

      it('returns \'Send Email Extraction\' when an email is present in the model', () => {
        model.loading = false;
        model.query.email = 'someone@keen.io';
        component.forceUpdate();
        expect($R(component).find('[role="run-query"]').text()).toEqual('Send Email Extraction');
      });


      it('returns \'Sending...\' when an email is present in the model and the model is loading', () => {
        model.loading = true;
        model.query.email = 'someone@keen.io';
        component.forceUpdate();
        expect($R(component).find('[role="run-query"]').text()).toEqual('Sending...');
      });

      it('returns \'Running...\' when extraction is loading', () => {
        model.loading = true;
        component.forceUpdate();
        expect($R(component).find('[role="run-query"]').text()).toEqual('Running...');
      });
    });
  });

});
