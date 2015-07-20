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

  // React methods

  render: function() {
    return (
      <div className="row margin-bottom-small">
        <div className="col-md-12">
          <FieldsToggle ref="toggle"
                        name="Group By"
                        initialOpenState={this.props.value}
                        updateFn={this.props.updateGroupBy}
                        getFn={this.getGroupBy}
                        attrsToStore="group_by"
                        toggleCallback={this.focusOnReactSelect}>
            <ReactSelect ref="select"
                         inputClasses="group-by form-control"
                         name="group_by"
                         items={this.props.options}
                         handleChange={this.props.handleChange}
                         value={this.props.value || ''}
                         sort={true} />
          </FieldsToggle>
        </div>
      </div>
    );
  }

});

module.exports = GroupByField;
