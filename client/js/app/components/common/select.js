/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');

var SelectComponent = React.createClass({

  buildOptions: function() {
    if (this.state.options.length) {

      return this.state.options.map(function(option) {
        return (
          <option value={option.value} key={option.value} disabled={option.disabled || false}>
            {option.name}
          </option>
        );
      });
    } else {
      return null;
    }
  },

  wrapValuesInObjects: function(options) {
    if (!_.isObject(options[0])) {
      return _.map(options, function(option) {
        return { name: option, value: option };
      });
    }
    return options;
  },

  sortOptions: function(options) {
    return options.sort(function(a, b){
      var A = a.name.toLowerCase();
      var B = b.name.toLowerCase();

       if (A < B){
        return -1;
       } else if (A > B) {
        return  1;
       } else {
         return 0;
       }
    });
  },

  buildEmptyOption: function() {
    var emptyOption = this.props.emptyOption;

    if (emptyOption === true) {
      return (<option value=""></option>);
    } else if (emptyOption) {
      return (<option value="">{emptyOption}</option>);
    } else {
      return null;
    }
  },

  setupOptions: function(options) {
    var newOptions = this.wrapValuesInObjects(options);
    if (this.props.sort) newOptions = this.sortOptions(newOptions);
    return newOptions;
  },

  // React Methods

  getDefaultProps: function() {
    return {
      classes: 'form-group',
      sort: true,
      emptyOption: true,
      reference: 'select',
      handleSelection: function(){},
      handleBlur: function(){},
      options: []
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ options: this.setupOptions(nextProps.options) });
  },

  getInitialState: function() {
    return {
      options: this.setupOptions(this.props.options)
    };
  },

  render: function() {
    var optionNodes = this.buildOptions();
    var label = this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null;
    var emptyOption = this.buildEmptyOption();
    var emptyVal = this.props.multiple ? [] : ''
    var selectedValue = this.props.selectedOption ? this.props.selectedOption : emptyVal;

    return (
      <div className={this.props.classes}>
        {label}
        <div className="select-element">
          <select ref={this.props.reference}
                  name={this.props.name}
                  value={selectedValue}
                  className="form-control"
                  multiple={this.props.multiple}
                  onChange={this.props.handleSelection}
                  onBlur={this.props.handleBlur}
                  disabled={this.props.disabled}>
            {emptyOption}
            {optionNodes}
          </select>
        </div>
      </div>
    );
  }

});

module.exports = SelectComponent;
