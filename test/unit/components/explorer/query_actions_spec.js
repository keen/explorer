/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var QueryActions = require('../../../../client/js/app/components/explorer/query_actions.js');
var TestHelpers = require('../../../support/TestHelpers');
var $R = require('rquery')(_, React);

describe('components/explorer/query_actions', function() {

  beforeEach(function() {
    this.model = TestHelpers.createExplorerModel();
    this.model.user = { id: 1 };
    this.clearStub = sinon.stub();
    this.handleSubmitStub = sinon.stub();
    this.handleRevertStub = sinon.stub();

    this.defaultProps = {
      handleQuerySubmit: this.handleSubmitStub,
      clearQuery: this.clearStub,
      model: this.model,
      handleRevertChanges: this.handleRevertStub,
      persistence: null,
      user: { id: 1 },
      removeClick: function(){}
    };
    this.renderComponent = function(props) {
      var props = _.assign({}, this.defaultProps, props);
      return TestUtils.renderIntoDocument(<QueryActions {...props} />);
    };
    this.component = this.renderComponent();
  });

  describe('setup', function () {
    it('is of the right type', function () {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, QueryActions));
    });

    describe('buttons shown', function () {
      describe('default buttons', function () {
        it('has the run-query button', function () {
          assert.lengthOf($R(this.component).find('[role="run-query"]'), 1);
        });
        it('has the clear button button', function () {
          assert.lengthOf($R(this.component).find('[role="clear-query"]'), 1);
        });
        it('has the clear button button', function () {
          assert.lengthOf($R(this.component).find('[role="clear-query"]'), 1);
        });  
      });
      describe('dynamic buttons', function () {
        describe('without persistence', function () {
          it('does not show the save button if persistence is null', function () {
            assert.lengthOf($R(this.component).find('[role="save-query"]'), 0);
          });
          it('does not show the delete button if persistence is null', function () {
            assert.lengthOf($R(this.component).find('[role="delete-query"]'), 0);
          });  
        });
        describe('with persistence', function () {
          describe('if the user IS the query creator', function () {
            it('does show the save button', function () {
              this.component = this.renderComponent({ persistence: {}, user: { id: 1 } });
              assert.lengthOf($R(this.component).find('[role="save-query"]'), 1);
            });
            it('does show the delete button', function () {
              this.component = this.renderComponent({ persistence: {}, user: { id: 1 } });
              assert.lengthOf($R(this.component).find('[role="delete-query"]'), 1);
            });    
          });
          describe('if the user IS NOT the query creator', function () {
            it('does not show the save button', function () {
              this.component = this.renderComponent({ persistence: {}, user: { id: 10 } });
              assert.lengthOf($R(this.component).find('[role="save-query"]'), 0);
            });
            it('does not show the delete button', function () {
              this.component = this.renderComponent({ persistence: {}, user: { id: 10 } });
              assert.lengthOf($R(this.component).find('[role="delete-query"]'), 0);
            });
          });
          describe('if the query is an email extraction', function () {
            it('does not show the save button', function () {
              var model = TestHelpers.createExplorerModel();
              model.query.analysis_type = 'extraction';
              model.query.email = 'someone@keen.io';
              this.component = this.renderComponent({ 
                model: model,
                persistence: {}
              });
              assert.lengthOf($R(this.component).find('[role="save-query"]'), 0);
            });
          });
        });
      });
    });
  });

  describe('Button text', function(){

    it('returns \'Run model\' when model is not loading', function() {
      this.model.loading = false;
      this.component.forceUpdate();
      assert.equal($R(this.component).find('[role="run-query"]').text(), 'Run Query');
    });

    it('returns \'Running...\' when model is loading', function() {
      this.component.props.model.loading = true;
      this.component.forceUpdate();
      assert.equal($R(this.component).find('[role="run-query"]').text(), 'Running...');
    });

    describe('extractions', function() {
      beforeEach(function(){
        this.model.query.analysis_type = 'extraction';
      });

      it('returns \'Run Extraction\' when no email is present in the model', function(){
        this.model.loading = false;
        this.component.forceUpdate();
        assert.equal($R(this.component).find('[role="run-query"]').text(), 'Run Extraction');
      });

      it('returns \'Send Email Extraction\' when an email is present in the model', function(){
        this.model.loading = false;
        this.model.query.email = 'someone@keen.io';
        this.component.forceUpdate();
        assert.equal($R(this.component).find('[role="run-query"]').text(), 'Send Email Extraction');
      });


      it('returns \'Sending...\' when an email is present in the model and the model is loading', function(){
        this.model.loading = true;
        this.model.query.email = 'someone@keen.io';
        this.component.forceUpdate();
        assert.equal($R(this.component).find('[role="run-query"]').text(), 'Sending...');
      });

      it('returns \'Running...\' when extraction is loading', function() {
        this.model.loading = true;
        this.component.forceUpdate();
        assert.equal($R(this.component).find('[role="run-query"]').text(), 'Running...');
      });
    });
  });

  describe('helper functions', function () {
    describe('shouldShowRevertButton', function () {
      it('should return true if the model and its original are different', function () {
        var model = TestHelpers.createExplorerModel();
        model.id = 'abc-123';
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'count';
        model.originalModel = _.cloneDeep(model);
        model.query.event_collection = 'not clicks';
        this.component = this.renderComponent({ model: model });
        assert.isTrue(this.component.shouldShowRevertButton());
      });
      it('should return false if the model and its original are the same', function () {
        var model = TestHelpers.createExplorerModel();
        model.id = 'abc-123';
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'count';
        model.originalModel = _.cloneDeep(model);
        this.component = this.renderComponent({ model: model });
        assert.isFalse(this.component.shouldShowRevertButton());
      });
    });
  });

});