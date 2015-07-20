/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');

// Components
var Input = require('../../common/input.js');

var PercentileField = React.createClass({

  // React methods

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Input ref="input"
                 label="Percentile Value"
                 classes="percentile"
                 name="percentile"
                 required="true"
                 placeholder="Ex: 50"
                 onChange={this.props.onChange}
                 value={this.props.value || ""} />
        </div>
      </div>
    );
  }

});

module.exports = PercentileField;
