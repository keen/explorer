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
    // var revertBtn;
    var saveBtn;
    var deleteBtn;
    var runButtonClasses = classNames({
      'disabled': this.props.model.loading,
      'btn btn-primary run-query': true
    });
    var codeSampleBtnClasses = classNames({
      'btn btn-default code-sample-toggle pull-right': true,
      'open': !this.props.codeSampleHidden
    });
    if (this.props.persistence && !ExplorerUtils.isEmailExtraction(this.props.model)) {
      saveBtn = (
        <button type="button" className="btn btn-success save-query" onClick={this.props.saveQueryClick} ref="save-query" disabled={this.props.model.loading}>
          {ExplorerUtils.isPersisted(this.props.model) ? 'Update' : 'Save'}
        </button>
      );
      if (this.props.removeClick) {
        deleteBtn = (
          <button type="button" className="btn btn-link" onClick={this.props.removeClick}>
            Delete
          </button>
        );
      }
    }

    return (
      <div className="query-actions clearfix">
        <div className="run-group pull-left">
          <button type="submit" ref="runquery" className={runButtonClasses} id="run-query" onClick={this.props.handleQuerySubmit}>
            {this.runButtonText()}
          </button>
        </div>
        <div className="manage-group pull-left">
          {saveBtn}
          {deleteBtn}
        </div>
        <div className="pull-right">
          <button className={codeSampleBtnClasses} onClick={this.props.toggleCodeSample}>
            <span>&lt;/&gt; Embed</span>
          </button>
        </div>
      </div>
    );
  }

});

module.exports = QueryActions;
