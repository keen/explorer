var React = require('react');
var classNames = require('classnames');
var TextareaComponent = require('../../common/textarea.js')

var KeenVizConfig = React.createClass({

  propTypes: {
    onCloseClick: React.PropTypes.func.isRequired,
    hidden: React.PropTypes.bool.isRequired,
    updateChartFootnotes: React.PropTypes.func.isRequired
  },

  render: function() {
    var panelClasses = classNames({
      'viz-config-panel': true,
      'hide': this.props.hidden
    });

    return (
      <div className={panelClasses}>
        <a href="#" className="close-btn pull-right" role="close-viz-config" onClick={this.props.onCloseClick}>
          <span className="icon glyphicon glyphicon glyphicon-remove-circle no-margin"></span>
        </a>
        <div className="alert alert-info">
           <TextareaComponent onChange={this.props.updateChartFootnotes} 
                              readOnly={false} 
                              placeholder={"Footnotes..."} />
        </div>
      </div>
    );
  }
});

module.exports = KeenVizConfig;