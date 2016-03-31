var _ = require('lodash');
var React = require('react');
var classNames = require('classnames');

var CodeSample = React.createClass({
  render: function() {
    var panelClasses = classNames({
      'code-sample-panel': true,
      'hide': this.props.hidden
    });

    var text;
    if(this.props.isValid) {
      text = this.props.codeSample;
    } else {
      text = "Your query is not valid right now, so we can't show you a code sample.";
    }

    return (
      <div className={panelClasses}>
        <a href="#" className="close-btn" onClick={this.props.onCloseClick}>
          <span className="icon glyphicon glyphicon glyphicon-remove-circle no-margin"></span>
        </a>
        <div className="sample"><pre>{text}</pre></div>
      </div>
    );
  }
});

module.exports = CodeSample;
