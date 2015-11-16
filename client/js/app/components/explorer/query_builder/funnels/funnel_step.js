var React = require('react');
var _ = require('lodash');

var FunnelStep = React.createClass({

  render: function() {
    return (
      <div className="funnel-step">
        {this.props.index}
      </div>
    );
  }

});

module.exports = FunnelStep;
