/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');

// Components
var ReactSelect = require('../../common/react_select.js');

var TargetPropertyField = React.createClass({

  // React methods

  render: function() {
    return (
      <div className="field-component">
        <label>Target Property <small>(required)</small></label>
        <ReactSelect ref="select"
                     inputClasses="target-property form-control"
                     name="target_property"
                     items={this.props.options}
                     handleChange={this.props.handleChange}
                     value={this.props.value}
                     sort={true} />
      </div>
    );
  }

});

module.exports = TargetPropertyField;
