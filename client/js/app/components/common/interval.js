/**
* @jsx React.DOM
*/

var _ = require('lodash');
var moment = require('moment');
var React = require('react/addons');
var Select = require('./select.js');
var FieldsToggle = require('./fields_toggle.js');
var ExplorerActions = require('../../actions/ExplorerActions');
var ExplorerUtils = require('../../utils/ExplorerUtils');
var ProjectUtils = require('../../utils/ProjectUtils');

var Interval = React.createClass({

  setInterval: function(event) {
    this.props.handleChange('interval', event.target.value);
  },

  intervalFieldsToggled: function(toggleState){
    if (toggleState && !this.props.interval) {
      this.props.handleChange('interval', 'daily')
    }
  },

  intervalUpdateFn: function(updates) {
    this.props.handleChange('interval', updates['interval'])
  },

  intervalGetFn: function(attr) {
    if (attr === 'interval') {
      return this.props.interval;
    } else {
      throw new Error("Interval component is only aware of interval attributes")
    }
  },

  // React Methods

  render: function() {
    return (
      <div className="field-component">
        <FieldsToggle ref="interval-toggle"
                      name="Interval"
                      initialOpenState={this.props.interval}
                      attrsToStore={'interval'}
                      getFn={this.intervalGetFn}
                      updateFn={this.intervalUpdateFn}
                      toggleCallback={this.intervalFieldsToggled}>
          <Select label={false}
                  name="interval"
                  classes="interval-type"
                  options={ProjectUtils.getConstant('ABSOLUTE_INTERVAL_TYPES')}
                  emptyOption={false}
                  handleSelection={this.setInterval}
                  selectedOption={this.props.interval}
                  sort={false} />
        </FieldsToggle>
      </div>
    );
  }
});

module.exports = Interval;
