var React = require('react');
var classNames = require('classnames');

var KeenVizConfig = React.createClass({

  propTypes: {
    onCloseClick: React.PropTypes.func.isRequired,
    hidden: React.PropTypes.bool.isRequired
  },

  render: function() {
    var panelClasses = classNames({
      'viz-config-panel': true,
      'hide': this.props.hidden
    });

    return (
      <div className={panelClasses}>
        <a href="#" className="close-btn pull-right" onClick={this.props.onCloseClick}>
          <span className="icon glyphicon glyphicon glyphicon-remove-circle no-margin"></span>
        </a>
        <div className="alert alert-info">Hello, World.</div>
      </div>
    );
  }
});

module.exports = KeenVizConfig;