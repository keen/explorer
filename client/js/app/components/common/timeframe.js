/**
* @jsx React.DOM
*/

var _ = require('lodash');
var moment = require('moment');
var React = require('react/addons');
var AbsolutePicker = require('./absolute_picker.js');
var RelativePicker = require('./relative_picker.js');
var FieldsToggle = require('./fields_toggle.js');
var ReactSelect = require('./react_select.js');
var Timezone = require('./timezone.js');
var ExplorerActions = require('../../actions/ExplorerActions');
var ExplorerUtils = require('../../utils/ExplorerUtils');
var ProjectUtils = require('../../utils/ProjectUtils');

function relativeDefaults() {
  return {
    relativity: 'this',
    amount: '14',
    sub_timeframe: 'days'
  };
}

function absoluteDefaults() {
  return {
    start: new Date(moment().subtract(1, 'days').startOf('day').format()),
    end: new Date(moment().startOf('day').format())
  };
}

var Timeframe = React.createClass({

  toggleTimeframeType: function(event) {
    event.preventDefault();
    var type = event.currentTarget.dataset.type;
    var updates = _.cloneDeep(this.props.model);
    updates.timeframe_type = type;
    updates.query.time = (type === 'absolute') ? absoluteDefaults() : relativeDefaults();
    ExplorerActions.update(this.props.model.id, updates);
  },

  timeframeFieldsToggled: function(toggleState) {
    if (toggleState && !ExplorerUtils.getTimeframe(this.props.model)) {
      var updates = _.cloneDeep(this.props.model);
      if (this.isRelative()) {
        updates.query.time = relativeDefaults();
      } else {
        updates.query.time = absoluteDefaults();
      }
      ExplorerActions.update(this.props.model.id, updates);
    }
  },

  isAbsolute: function() {
    return this.props.model.timeframe_type === 'absolute';
  },

  isRelative: function() {
    return this.props.model.timeframe_type === 'relative';
  },

  timeframeUpdateFn: function(updates) {
    ExplorerActions.update(this.props.model.id, {
      query: _.assign({}, this.props.model.query, updates)
    });
  },

  timeframeGetFn: function(attr) {
    return this.props.model.query[attr];
  },

  // React Methods

  render: function() {
    var timezone = this.props.model.query.timezone || ProjectUtils.getConstant('DEFAULT_TIMEZONE');

    if (this.isAbsolute()) {
      var timeframePicker = <AbsolutePicker model={this.props.model}/>;
    } else {
      var timeframePicker = <RelativePicker relativeIntervalTypes={ProjectUtils.getConstant('RELATIVE_INTERVAL_TYPES')}
                                            model={this.props.model}/>;
    }

    return (
      <div className="timeframe">
        <div className="field-component">
          <label>Timeframe</label>
          <ul className="nav nav-pills" role="tablist">
            <li className={this.isRelative() ? 'active' : ''}>
              <a href="#" className="relative-tab" data-type="relative" onClick={this.toggleTimeframeType}>Relative</a>
            </li>
            <li className={this.isAbsolute() ? 'active' : ''}>
              <a href="#" className="absolute-tab" data-type="absolute" onClick={this.toggleTimeframeType}>Absolute</a>
            </li>
          </ul>
          {timeframePicker}
          <Timezone model={this.props.model} />
        </div>
      </div>
    );
  }
});

module.exports = Timeframe;
