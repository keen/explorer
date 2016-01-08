/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var Loader = require('../../common/loader.js');
var KeenViz = require('./keen_viz.js');
var ExplorerUtils = require('../../../utils/ExplorerUtils');
var FormatUtils = require('../../../utils/FormatUtils');

var Chart = React.createClass({

	// ***********************
	// Content building
	// ***********************

	buildVizContent: function() {
	  if (!this.props.model.response) {
	  	return (
	  	  <div ref="notice" className="big-notice">
	  	    <div className="alert alert-info">
	  	      {'Let\'s go exploring!'}
	  	    </div>
	  	  </div>
	  	);
	  }

	  if (ExplorerUtils.isEmailExtraction(this.props.model)) {
	  	return (
	  	  <div ref="notice" className="big-notice">
	  	    <div className="alert alert-info">
	  	      {'Email extractions don\'t have visualizations.'}
	  	    </div>
	  	  </div>
	  	);
	  }

	  if (!ExplorerUtils.resultCanBeVisualized(this.props.model)) {
	  	return (
	  	  <div ref="notice" className="big-notice">
	  	    <div className="alert alert-danger">
	  	      <span className="icon glyphicon glyphicon-info-sign error"></span>
	  	      Your query returned no results.
	  	    </div>
	  	  </div>
	  	);
	  }

	  if (ExplorerUtils.resultCanBeVisualized(this.props.model)) {
	    return this.buildViz();
	  } else {
	  	this.props.dataviz.destroy();
	  }
	},

	buildViz: function() {
		var chartContent;
		var msgContent;
		var analysisType = this.props.model.query.analysis_type;
		var wrapClasses = analysisType + '-viz';

	  if (ExplorerUtils.isJSONViz(this.props.model)) {
	  	var content = FormatUtils.prettyPrintJSON({
	  		result: this.props.model.response.result
	  	});
	  	chartContent = (
	  		<textarea ref='jsonViz' className="json-view" value={content} readOnly />
	  	);
		}
		else {
	  	chartContent = (
	  		<KeenViz model={this.props.model} dataviz={this.props.dataviz} />
	  	);
	  }

    return (
      <div className={wrapClasses}>
        {chartContent}
      </div>
    );
	},

	// ***********************
	// Lifecycle hooks
	// ***********************

  render: function() {
  	var vizContent = this.buildVizContent();

    return (
			<div className="chart-area">
				<Loader visible={this.props.model.loading} />
	      {vizContent}
			</div>
    );
  }
});

module.exports = Chart;
