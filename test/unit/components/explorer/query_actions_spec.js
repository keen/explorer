
let sinon from 'sinon/pkg/sinon.js');
var _ from 'lodash');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var QueryActions from '../../../../lib/js/app/components/explorer/query_actions.js');
var TestHelpers from '../../../support/TestHelpers');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/query_actions', () => {

  beforeEach(() => {
    this.model = TestHelpers.createExplorerModel();
    this.model.metadata.user = { id: 1 };
    this.model.metadata.display_name = 'A saved query name';
    this.handleSubmitStub = sinon.stub();
    this.handleRevertStub = sinon.stub();

    this.defaultProps = {
      handleQuerySubmit: this.handleSubmitStub,
      model: this.model,
      handleRevertChanges: this.handleRevertStub,
      persistence: null,
      user: { id: 1 },
      removeClick: () => {}
    };
    this.renderComponent = function(props) {
      var props = _.assign({}, this.defaultProps, props);
      return TestUtils.renderIntoDocument(<QueryActions {...props} />);
    };
    this.component = this.renderComponent();
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, QueryActions));
    });

    describe('buttons shown', () => {
      describe('default buttons', () => {
        it('has the run-query button', () => {
          assert.lengthOf($R(this.component).find('[role="run-query"]').components, 1);
        });
      });
      describe('dynamic buttons', () => {
        describe('without persistence', () => {
          it('does not show the save button if persistence is null', () => {
            assert.lengthOf($R(this.component).find('[role="save-query"]').components, 0);
          });
          it('does not show the delete button if persistence is null', () => {
            assert.lengthOf($R(this.component).find('[role="delete-query"]').components, 0);
          });
          it('does not show the clone button if persistence is null', () => {
            assert.lengthOf($R(this.component).find('[role="clone-query"]').components, 0);
          });
        });
        describe('with persistence', () => {
          it('does show the save button', () => {
            this.component = this.renderComponent({ persistence: {} });
            assert.lengthOf($R(this.component).find('[role="save-query"]').components, 1);
          });
          it('does show the delete button', () => {
            this.component = this.renderComponent({ persistence: {} });
            assert.lengthOf($R(this.component).find('[role="delete-query"]').components, 1);
          });
          it('does show the clone button', () => {
            this.component = this.renderComponent({ persistence: {} });
            assert.lengthOf($R(this.component).find('[role="clone-query"]').components, 1);
          });
          describe('if the query is an email extraction', () => {
            it('the save button is disabled', () => {
              var model = TestHelpers.createExplorerModel();
              model.query.analysis_type = 'extraction';
              model.query.email = 'someone@keen.io';
              this.component = this.renderComponent({
                model: model,
                persistence: {}
              });
              assert.isTrue($R(this.component).find('[role="save-query"]').components[0].disabled);
            });
          });
        });
      });
    });
  });

  describe('button callbacks', () => {
    it('calls handleQuerySubmit when the run query button is clicked', () => {
      var stub = sinon.stub();
      this.component = this.renderComponent({ handleQuerySubmit: stub });
      TestUtils.Simulate.click($R(this.component).find('[role="run-query"]').components[0]);
      assert.isTrue(stub.calledOnce);
    });
    it('calls saveQueryClick when the save query button is clicked', () => {
      var stub = sinon.stub();
      this.component = this.renderComponent({ persistence: {}, saveQueryClick: stub });
      TestUtils.Simulate.click($R(this.component).find('[role="save-query"]').components[0]);
      assert.isTrue(stub.calledOnce);
    });
    it('calls removeClick when the delete query button is clicked', () => {
      var stub = sinon.stub();
      this.component = this.renderComponent({ persistence: {}, removeClick: stub });
      TestUtils.Simulate.click($R(this.component).find('[role="delete-query"]').components[0]);
      assert.isTrue(stub.calledOnce);
    });
    it('calls toggleCodeSample when the embed button is clicked', () => {
      var stub = sinon.stub();
      this.component = this.renderComponent({ toggleCodeSample: stub });
      TestUtils.Simulate.click($R(this.component).find('[role="toggle-code-sample"]').components[0]);
      assert.isTrue(stub.calledOnce);
    });
  });

  describe('Button text', () => {

    it('returns \'Run model\' when model is not loading', () => {
      this.model.loading = false;
      this.component.forceUpdate();
      assert.equal($R(this.component).find('[role="run-query"]').text(), 'Run Query');
    });

    it('returns \'Running...\' when model is loading', () => {
      this.component.props.model.loading = true;
      this.component.forceUpdate();
      assert.equal($R(this.component).find('[role="run-query"]').text(), 'Running...');
    });

    describe('extractions', () => {
      beforeEach(() => {
        this.model.query.analysis_type = 'extraction';
      });

      it('returns \'Run Extraction\' when no email is present in the model', () => {
        this.model.loading = false;
        this.component.forceUpdate();
        assert.equal($R(this.component).find('[role="run-query"]').text(), 'Run Extraction');
      });

      it('returns \'Send Email Extraction\' when an email is present in the model', () => {
        this.model.loading = false;
        this.model.query.email = 'someone@keen.io';
        this.component.forceUpdate();
        assert.equal($R(this.component).find('[role="run-query"]').text(), 'Send Email Extraction');
      });


      it('returns \'Sending...\' when an email is present in the model and the model is loading', () => {
        this.model.loading = true;
        this.model.query.email = 'someone@keen.io';
        this.component.forceUpdate();
        assert.equal($R(this.component).find('[role="run-query"]').text(), 'Sending...');
      });

      it('returns \'Running...\' when extraction is loading', () => {
        this.model.loading = true;
        this.component.forceUpdate();
        assert.equal($R(this.component).find('[role="run-query"]').text(), 'Running...');
      });
    });
  });

});
