import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import AbsolutePicker from './absolute_picker.js';
import RelativePicker from './relative_picker.js';
import FieldsToggle from './fields_toggle.js';
import ReactSelect from './react_select.js';
import Timezone from './timezone.js';
import ExplorerActions from '../../actions/ExplorerActions';
import TimeframeUtils from '../../utils/TimeframeUtils';
import ProjectUtils from '../../utils/ProjectUtils';

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

    this.props.handleChange('time', (type === 'absolute') ? absoluteDefaults() : relativeDefaults());
  },

  isAbsolute: function() {
    return TimeframeUtils.timeframeType(this.props.time) === 'absolute';
  },

  isRelative: function() {
    return TimeframeUtils.timeframeType(this.props.time) === 'relative';
  },

  // React Methods

  render: function() {
    var timezone = this.props.timezone || ProjectUtils.getConstant('DEFAULT_TIMEZONE');

    if (this.isAbsolute()) {
      var timeframePicker = <AbsolutePicker time={this.props.time}
                            handleChange={this.props.handleChange} />;
    } else {
      var timeframePicker = <RelativePicker relativeIntervalTypes={ProjectUtils.getConstant('RELATIVE_INTERVAL_TYPES')}
                                            time={this.props.time}
                                            handleChange={this.props.handleChange} />;
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
          <Timezone timezone={this.props.timezone}
                    timeframe_type={TimeframeUtils.timeframeType(this.props.time)}
                    handleChange={this.props.handleChange} />
        </div>
      </div>
    );
  }
});

export default Timeframe;
