/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');

var RunQuery = React.createClass({

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
    var queryButtonClasses = classNames({
      'disabled': this.props.model.loading,
      'btn btn-primary run-query pull-left': true
    });

    return (
      <div className={this.props.classes}>
        <button type="submit" className={queryButtonClasses} onClick={this.props.handleQuerySubmit} ref="runquery" id="run-query">
          <span className="icon glyphicon glyphicon-check"></span>
          {this.queryButtonText()}
        </button>
        <button type="reset" className="btn btn-default pull-left" onClick={this.props.clearQuery} id="clear-explorer-query">
          Clear
        </button>
      </div>
    );
  }

});

module.exports = RunQuery;