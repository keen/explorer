/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');
var ExplorerUtils = require('../../utils/ExplorerUtils');

var QueryActions = React.createClass({

  states: {
    default: {
      inactive: 'Run Query',
      active: 'Running...'
    },
    immediateExtraction: {
      inactive: 'Run Extraction',
      active: 'Running...'
    }
  },

  shouldShowRevertButton: function() {
    return ExplorerUtils.isPersisted(this.props.model) && this.props.model.originalModel && this.props.model.originalModel.query && !_.isEqual(this.props.model.query, this.props.model.originalModel.query);
  },

  runButtonText: function() {
    var stateType;
    var analysisType = this.props.model.query.analysis_type;

    if (analysisType === 'extraction') {
      var stateType = 'immediateExtraction';
    } else {
      var stateType = 'default';
    }
    var states = this.states[stateType];

    return this.props.model.loading ? states.active : states.inactive;
  },

  render: function() {
    var revertBtn;
    var deleteBtn;
    var runButtonClasses = classNames({
      'disabled': this.props.model.loading,
      'btn btn-primary run-query margin-right-tiny': true
    });
    if (this.shouldShowRevertButton()) {
      revertBtn = (
        <button className="btn btn-default margin-right-tiny" onClick={this.props.handleRevertChanges}>Revert to original</button>
      );
    }
    if (this.props.removeClick && this.props.model.user.id === this.props.user.id) {
      deleteBtn = (
        <button type="button" className="btn btn-default" onClick={this.props.removeClick}>
          Delete
        </button>
      );
    }
    return (
      <div className="query-actions clearfix">
        <div className="row">
          <div className="col-md-10 clearfix">
            <div className="run-group margin-right-tiny pull-left">
              <button type="submit" ref="runquery" className={queryButtonClasses} id="run-query" onClick={this.props.handleQuerySubmit}>
                {this.runButtonText()}
              </button>
              <button type="reset" ref="clearquery" className="btn btn-default margin-right-tiny" id="clear-explorer-query" onClick={this.props.clearQuery}>
                Clear
              </button>
              {revertBtn}
            </div>
            <div className="manage-group pull-left">
              <button type="button" className="btn btn-success save-query margin-right-tiny" onClick={this.props.saveQueryClick} ref="save-query" disabled={this.props.model.loading}>
                {ExplorerUtils.isPersisted(this.props.model) ? 'Update' : 'Save'}
              </button>
              {deleteBtn}
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-default code-sample-toggle pull-right">
              <span>&lt;/&gt; Embed</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = QueryActions;
