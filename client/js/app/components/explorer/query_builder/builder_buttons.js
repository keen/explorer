/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');

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
    if (!_.isEqual(_.omit(this.props.model, 'originalModel'), this.props.model.originalModel)) {
      revertBtn = (
          <button className="pull-left btn btn-default" onClick={this.props.handleRevertChanges}>Revert to original</button>
      );
    }
    return (
      <div className="query-builder-buttons row">
        <div className="col-md-4">
          {revertBtn}
        </div>
        <div className="col-md-8">
          <div className="pull-right">
            <button type="reset" ref="clearquery" className="btn btn-default pull-left" onClick={this.props.clearQuery} id="clear-explorer-query">
              Clear
            </button>
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
