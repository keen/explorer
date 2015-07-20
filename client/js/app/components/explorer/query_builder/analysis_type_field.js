/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');

// Components
var ReactSelect = require('../../common/react_select.js');

var AnalysisTypeField = React.createClass({

  // React methods

  render: function() {
    return (
      <div className="row margin-bottom-small">
        <div className="col-md-12">
          <label>Analysis Type</label>
          <ReactSelect ref="select"
                       name="analysis_type"
                       inputClasses="analysis-type form-control"
                       items={this.props.options}
                       handleChange={this.props.handleChange}
                       value={this.props.value} />
        </div>
      </div>
    );
  }

});

module.exports = AnalysisTypeField;
