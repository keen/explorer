var React = require('react');
var classNames = require('classnames');

var KeenVizConfig = React.createClass({

  propTypes: {
    onCloseClick: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div>
        <div className="big-notice"> Hello, World!  
          <a href="#" className="close-btn pull-right" onClick={this.props.onCloseClick}>
            <span className="icon glyphicon glyphicon glyphicon-remove-circle no-margin"></span>
          </a>
        </div>
      </div>
    );
  }

});

module.exports = KeenVizConfig;
