var React = require('react');
var _ = require('lodash');

var LoaderComponent = React.createClass({

  toggle: function(visible) {
    this.props.visible = visible;
    this.forceUpdate();
  },

  // React Methods

  getDefaultProps: function() {
    return {
      visible: false,
      additionalClasses: false
    };
  },

  render: function() {
    var classes = "explorer-loader";
    if (!this.props.visible) classes += " hide";
    if (this.props.additionalClasses) classes += " " + this.props.additionalClasses;

    return (
      <div className={classes}>
        <div className="msg">
          <div className="explorer-spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
          Loading...
        </div>
      </div>
    );
  }

});

module.exports = LoaderComponent;
