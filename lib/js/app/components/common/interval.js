import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import Select from './select.js';
import FieldsToggle from './fields_toggle.js';
import ExplorerActions from '../../actions/ExplorerActions';
import ExplorerUtils from '../../utils/ExplorerUtils';
import ProjectUtils from '../../utils/ProjectUtils';

const Interval = React.createClass({

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

export default Interval;
