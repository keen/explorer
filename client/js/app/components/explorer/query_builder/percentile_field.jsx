var React = require('react');
var _ = require('lodash');

// Components
var Input = require('../../common/input.jsx');

var PercentileField = React.createClass({

  // React methods

  render: function() {
    return (
      <div className="field-component">
        <Input ref="input"
               label="Percentile Value"
               classes="percentile"
               name="percentile"
               required="true"
               placeholder="Ex: 50"
               onChange={this.props.onChange}
               value={this.props.value || ""} />
      </div>
    );
  }

});

module.exports = PercentileField;
