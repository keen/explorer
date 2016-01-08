/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var moment = require('moment');

var pickadate = require('../../../vendor/picker.js');
var pickadate = require('../../../vendor/picker.date.js');
var pickadate = require('../../../vendor/picker.time.js');

var Datepicker = React.createClass({

  handleOnBlur: function(event) {
    this.destroyPicker();
    var value = event.target.value;
    var isValid = moment(new Date(value)).isValid();

    if (isValid) {
      this.props.onBlur(event);
      this.setState({ errorMsg: false });
    } else if (value && !isValid) {
      this.setState({ errorMsg: 'Invalid' });
    }
  },

  onFocus: function() {
    var minimum = this.props.minimum;
    $(this.refs[this.props.refValue]).pickadate({
      format: 'mmm d, yyyy',
      editable: true,
      min: minimum,
      onSet: _.bind(function(args) {
        this.props.onSet(this.props.name, new Date(this.refs.datepicker.value));
      }, this)
    });
  },

  destroyPicker: function() {
    var picker = $(this.refs[this.props.refValue]).pickadate('picker');
    if (picker) picker.stop();
  },

  // React methods

  getInitialState: function() {
    return {
      errorMsg: false
    };
  },

  getDefaultProps: function () {
    return {
      refValue: 'datepicker',
      label: false,
      onChange: function(){},
      placeholder: '',
      classes: 'datepicker-wrapper form-group',
      onSet: function(){}
    };
  },

  render: function() {
    var label = this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null;
    var errorMsg = this.state.errorMsg ? <p>{this.state.errorMsg}</p> : '';

    return (
      <div className={this.props.classes}>
        {label}
        <input type="text"
               ref={this.props.refValue}
               name={this.props.name}
               className="form-control"
               value={this.props.value}
               onChange={this.props.onChange}
               onBlur={this.handleOnBlur}
               onFocus={this.onFocus}
               placeholder={this.props.placeholder} />
        {errorMsg}
      </div>
    );
  }
});

module.exports = Datepicker;
