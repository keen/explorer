var React = require('react');
var _ = require('lodash');

var InputComponent = React.createClass({

  _onChange: function(event) {
    this.setState({ value: event.target.value });
    this.props.onChange(event);
  },

  getDefaultProps: function() {
    return {
      classes: 'form-group',
      inputClasses: '',
      type: 'text',
      placeholder: '',
      readonly: false,
      onChange: function(){}
    };
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ value: nextProps.value });
  },

  render: function() {
    var required = this.props.required ? <small>(required)</small> : null;
    var label = this.props.label ? <label htmlFor={this.props.name}>{this.props.label} {required}</label> : null;
    var inputClasses = "form-control";
    if (this.props.inputClasses) inputClasses = inputClasses + " " + this.props.inputClasses;

    return (
      <div className={this.props.classes}>
        {label}
        <input ref="input"
               type={this.props.type}
               name={this.props.name}
               className={inputClasses}
               placeholder={this.props.placeholder}
               onChange={this._onChange}
               onBlur={this.props.onBlur}
               value={this.state.value}
               readOnly={this.props.readonly} />
      </div>
    );
  }

});

module.exports = InputComponent;
