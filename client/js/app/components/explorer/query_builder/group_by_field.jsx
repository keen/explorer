var React = require('react');
var _ = require('lodash');
var FieldsToggle = require('../../common/fields_toggle.jsx');

// Components
var ReactSelect = require('../../common/react_select.jsx');

var GroupByField = React.createClass({

  focusOnReactSelect: function(toggled) {
    if (toggled && !this.props.value) {
      var self = this;
      setTimeout(function(){
        self.refs.select.refs.input.focus();
      }, 100);
    }
  },

  multiGroupToggle: function() {
    var icon = this.props.value.length > 1 ? 'remove' : 'plus';
    var text = this.props.value.length > 1 ? 'Remove second property' : 'Group by a second property';
    return (
      <a className="double-groupby-toggle" href="#" onClick={this.toggleMultiGroupBy}>
        <i className={"margin-right-bump icon glyphicon glyphicon-"+icon}></i>
        {text}
      </a>
    );
  },

  secondField: function() {
    if (this.props.value.length > 1) {
      return (
        <ReactSelect ref="select"
                     inputClasses="group-by form-control margin-bottom-tiny"
                     wrapClasses="margin-top-tiny"
                     name="group_by.1"
                     items={this.props.options}
                     handleChange={this.handleChange}
                     value={this.props.value[1] || ''}
                     sort={true} />
      )
    }
  },

  getGroupBy: function() {
    return this.props.value;
  },

  handleChange: function(name, value) {
    var newVal = this.props.value.slice();
    newVal[name.split('.')[1]] = value;
    this.props.handleChange('group_by', newVal);
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

  shouldBeOpen: function() {
    return this.props.value && this.props.value[0]
  },

  // React methods

  render: function() {
    return (
      <div className="field-component">
        <FieldsToggle ref="toggle"
                      name="Group By"
                      initialOpenState={this.shouldBeOpen()}
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
          {this.secondField()}
          {this.multiGroupToggle()}
        </FieldsToggle>
      </div>
    );
  }

});

module.exports = GroupByField;
