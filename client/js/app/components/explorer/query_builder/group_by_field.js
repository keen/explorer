/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var FieldsToggle = require('../../common/fields_toggle.js');

// Components
var ReactSelect = require('../../common/react_select.js');

var GroupByField = React.createClass({

  focusOnReactSelect: function(toggled) {
    if (toggled && !this.props.value) {
      var self = this;
      setTimeout(function(){
        self.refs.select.refs.input.getDOMNode().focus();
      }, 100);
    }
  },

  getGroupBy: function() {
    return this.props.value;
  },

  handleChange: function(name, value) {
    var newVal = this.props.value.slice();
    var index = name.split('.')[1];
    newVal[index] = value;
    this.props.handleChange(name.split('.')[0], newVal);
  },

  toggleMultiGroupBy: function(event) {
    event.preventDefault();
    var newVal;
    switch (this.props.value.length) {
      case 0:
        newVal = this.props.value = ['', ''];
        break;
      case 1:
        newVal = this.props.value.concat(['']);
        break;
      case 2:
        newVal = this.props.value.slice(0,1);
        break;
    }
    this.props.handleChange('group_by', newVal);
  },

  // React methods

  render: function() {
    var secondGroupByField;
    var toggleText = "Group by a second property";
    var toggleIcon = "plus";

    if (this.props.value.length > 1) {
      secondGroupByField = (
        <ReactSelect ref="select"
                     inputClasses="group-by form-control margin-bottom-tiny"
                     wrapClasses="margin-top-tiny"
                     name="group_by.1"
                     items={this.props.options}
                     handleChange={this.handleChange}
                     value={this.props.value[1] || ''}
                     sort={true} />
      )
      toggleText = "Remove second property";
      toggleIcon = "remove";
    }
    var multiGroupToggle = (
      <a href="#" onClick={this.toggleMultiGroupBy}>
        <i className={"margin-right-bump icon glyphicon glyphicon-"+toggleIcon}></i>
        {toggleText}
      </a>
    );

    return (
      <div className="field-component">
        <FieldsToggle ref="toggle"
                      name="Group By"
                      initialOpenState={this.props.value.length > 0}
                      updateFn={this.props.updateGroupBy}
                      getFn={this.getGroupBy}
                      attrsToStore="group_by"
                      resetValues={{
                        group_by: []
                      }}
                      toggleCallback={this.focusOnReactSelect}>
          <ReactSelect ref="select"
                       inputClasses="group-by form-control margin-bottom-tiny"
                       name="group_by.0"
                       items={this.props.options}
                       handleChange={this.handleChange}
                       value={this.props.value[0] || ''}
                       sort={true} />
          {secondGroupByField}
          {multiGroupToggle}
        </FieldsToggle>
      </div>
    );
  }

});

module.exports = GroupByField;
