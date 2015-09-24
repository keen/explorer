/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');
var ExplorerUtils = require('../../utils/ExplorerUtils');

var QueryActions = React.createClass({

  runBtnStates: {
    default: {
      inactive: 'Run Query',
      active: 'Running...'
    },
    immediateExtraction: {
      inactive: 'Run Extraction',
      active: 'Running...'
    },
    emailExtraction: {
      inactive: 'Send Email Extraction',
      active: 'Sending...'
    }
  },

  shouldShowRevertButton: function() {
    return ExplorerUtils.isPersisted(this.props.model) && this.props.model.originalModel && this.props.model.originalModel.query && !_.isEqual(this.props.model.query, this.props.model.originalModel.query);
  },

  runButtonText: function() {
    var btnStates = this.runBtnStates.default;
    
    if (ExplorerUtils.isEmailExtraction(this.props.model)) {
      btnStates = this.runBtnStates.emailExtraction;
    } else if (ExplorerUtils.isImmediateExtraction(this.props.model)) {
      btnStates = this.runBtnStates.immediateExtraction;
    }

    return this.props.model.loading ? btnStates.active : btnStates.inactive;
  },

  render: function() {
    var revertBtn;
    var saveBtn;
    var deleteBtn;
    var runButtonClasses = classNames({
      'disabled': this.props.model.loading,
      'btn btn-primary run-query margin-right-tiny': true
    });
    var codeSampleBtnClasses = classNames({
      'btn btn-default code-sample-toggle pull-right': true,
      'open': !this.props.codeSampleHidden
    });
    if (this.shouldShowRevertButton()) {
      revertBtn = (
        <button className="btn btn-default margin-right-tiny" onClick={this.props.handleRevertChanges}>Revert to original</button>
      );
    }
    if (this.props.persistence && !ExplorerUtils.isEmailExtraction(this.props.model) && this.props.model.user.id === this.props.user.id) {
      saveBtn = (
        <button type="button" className="btn btn-success save-query margin-right-tiny" onClick={this.props.saveQueryClick} disabled={this.props.model.loading} role="save-query">
          {ExplorerUtils.isPersisted(this.props.model) ? 'Update' : 'Save'}
        </button>
      );
      if (this.props.removeClick) {
        deleteBtn = (
          <button type="button" className="btn btn-default" role="delete-query" onClick={this.props.removeClick}>
            Delete
          </button>
        );
      }
    }
    
    return (
      <div className="query-actions clearfix">
        <div className="row">
          <div className="col-md-10 clearfix">
            <div className="run-group pull-left">
              <button type="submit" role="run-query" className={runButtonClasses} id="run-query" onClick={this.props.handleQuerySubmit}>
                {this.runButtonText()}
              </button>
              <button type="reset" role="clear-query" className="btn btn-default margin-right-tiny" id="clear-explorer-query" onClick={this.props.clearQuery}>
                Clear
              </button>
              {revertBtn}
            </div>
            <div className="manage-group pull-left">
              {saveBtn}
              {deleteBtn}
            </div>
          </div>
          <div className="col-md-2">
            <button className={codeSampleBtnClasses} role="toggle-code-sample" onClick={this.props.toggleCodeSample}>
              <span>&lt;/&gt; Embed</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = QueryActions;
