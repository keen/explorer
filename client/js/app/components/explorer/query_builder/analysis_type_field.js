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
      <div className="field-component">
        <label>Analysis Type</label>
        <ReactSelect ref="select"
                     name="analysis_type"
                     inputClasses="analysis-type form-control"
                     items={this.props.options}
                     handleChange={this.props.handleChange}
                     value={this.props.value} />
      </div>
    );
  }

});

module.exports = AnalysisTypeField;
