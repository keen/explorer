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
    var saveMsg,
        saveBtn,
        deleteBtn,
        actionsSupported = true,
        runButtonClasses = classNames({
          'disabled': this.props.model.loading,
          'btn btn-primary run-query': true
        }),
        codeSampleBtnClasses = classNames({
          'btn btn-default code-sample-toggle pull-right': true,
          'open': !this.props.codeSampleHidden
        });

    var isEmailExtraction = ExplorerUtils.isEmailExtraction(this.props.model);
    var isPersisted = ExplorerUtils.isPersisted(this.props.model);
    var isFunnel = this.props.model.query.analysis_type === 'funnel';

    if (this.props.persistence) {
      if (isEmailExtraction) {
        actionsSupported = false;
        saveMsg = (
          <p className="no-margin margin-top-tiny">
            <small>The Keen IO API currently does not support saving email extraction.</small>
          </p>
        );
      }
      saveBtn = (
        <button type="button" className="btn btn-success save-query" onClick={actionsSupported ? this.props.saveQueryClick : function(){}} role="save-query" disabled={this.props.model.loading || !actionsSupported}>
          {isPersisted ? 'Update' : 'Save'}
        </button>
      );
      deleteBtn = (
        <button type="button" role="delete-query" className="btn btn-link" onClick={actionsSupported ? this.props.removeClick : function(){}} disabled={!actionsSupported}>
          Delete
        </button>
      );
    }

    return (
      <div className="query-actions clearfix">
        <div className="row">
          <div className="col-md-10 clearfix">
            <div className="run-group pull-left">
              <button type="submit" role="run-query" className={runButtonClasses} id="run-query" onClick={this.props.handleQuerySubmit}>
                {this.runButtonText()}
              </button>
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
        {saveMsg}
      </div>
    );
  }

});

module.exports = QueryActions;
