var React = require('react');
var _ = require('lodash');

var TextareaComponent = React.createClass({

  // Convenience functions

  setHeight: function() {
    var textAreaNode = this.refs[this.props.refValue];
    var newHeight = textAreaNode.scrollHeight + 'px';

    if (newHeight != this.state.styles.height) {
      this.setState({
        styles: { height: newHeight }
      });
    }
  },

  // Callbacks

  onChange: function(event) {
    if (this.props.dynamicHeight) {
      this.setHeight();
    }

    this.props.onChange(event);
  },

  // React Methods

  componentDidUpdate: function() {
    this.setHeight();
  },

  getDefaultProps: function() {
    return {
      refValue: 'textarea',
      classes: 'form-control',
      wrapClasses: '',
      placeholder: '',
      readOnly: true,
      wrap: "on",
      dynamicHeight: false,
      onChange: function(){}
    };
  },

  getInitialState: function() {
    return {
      styles: {}
    };
  },

  render: function() {
    var label = this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null;
    var value = this.props.value ? this.props.value : "";

    return (
      <div className={this.props.wrapClasses}>
        {label}
        <textarea ref={this.props.refValue}
                  className={this.props.classes}
                  name={this.props.name}
                  wrap={this.props.wrap}
                  style={this.state.styles}
                  placeholder={this.props.placeholder}
                  value={this.props.value}
                  onChange={this.onChange}
                  readOnly={true}></textarea>
      </div>
    );
  }

});

module.exports = TextareaComponent;
