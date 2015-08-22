/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');
var ExplorerUtils = require('../../../utils/ExplorerUtils');

var BuilderButtons = React.createClass({

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

  queryButtonText: function() {
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

  getDefaultProps: function() {
    return {
      classes: ''
    };
  },

  render: function() {
    var revertBtn;
    var queryButtonClasses = classNames({
      'disabled': this.props.model.loading,
      'btn btn-primary run-query': true
    });
    if (ExplorerUtils.isPersisted(this.props.model) && !_.isEqual(this.props.model.query, this.props.model.originalModel.query)) {
      revertBtn = (
        <button className="pull-left btn btn-default margin-right-tiny" onClick={this.props.handleRevertChanges}>Revert to original</button>
      );
    }
    return (
      <div className="query-builder-buttons row margin-top-small">
        <div className="col-md-8">
          <div className="pull-left">
            {revertBtn}
            <button type="reset" ref="clearquery" className="btn btn-default pull-left" onClick={this.props.clearQuery} id="clear-explorer-query">
              Clear
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="pull-right">
            <button type="submit" className={queryButtonClasses} onClick={this.props.handleQuerySubmit} ref="runquery" id="run-query">
              <span className="icon glyphicon glyphicon-check"></span>
              {this.queryButtonText()}
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = BuilderButtons;
