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
    var updates = _.cloneDeep(this.props.model.query);
    updates.interval = event.target.value;
    ExplorerActions.update(this.props.model.id, { query: updates });
  },

  intervalFieldsToggled: function(toggleState){
    if (toggleState && !this.props.model.query.interval) {
      var updates = _.cloneDeep(this.props.model.query);
      updates.interval = 'daily';
      ExplorerActions.update(this.props.model.id, { query: updates });
    }
  },

  intervalUpdateFn: function(updates) {
    ExplorerActions.update(this.props.model.id, {
      query: _.assign({}, this.props.model.query, updates)
    });
  },

  intervalGetFn: function(attr) {
    return this.props.model.query[attr];
  },

  // React Methods

  render: function() {
    var hasTimeframe = ExplorerUtils.getTimeframe(this.props.model) ? true : false;
    var warningMessage = (
      <div className="alert alert-warning">Intervals require a timeframe property.</div>
    );
    return (
      <div className="field-component">
        <FieldsToggle ref="interval-toggle"
                      name="Interval"
                      initialOpenState={this.props.model.query.interval}
                      attrsToStore={'interval'}
                      getFn={this.intervalGetFn}
                      updateFn={this.intervalUpdateFn}
                      toggleCallback={this.intervalFieldsToggled}>
          {hasTimeframe ? null : warningMessage}
          <Select label={false}
                  name="interval"
                  classes="interval-type"
                  options={ProjectUtils.getConstant('ABSOLUTE_INTERVAL_TYPES')}
                  emptyOption={false}
                  handleSelection={this.setInterval}
                  selectedOption={this.props.model.query.interval}
                  sort={false} />
        </FieldsToggle>
      </div>
    );
  }
});

module.exports = Interval;
