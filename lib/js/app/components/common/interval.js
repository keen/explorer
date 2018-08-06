import _ from 'lodash';
import moment from 'moment';
import React from 'react';

import Select from './select.js';
import Input from './input.js';
import FieldsToggle from './fields_toggle.js';
import ExplorerActions from '../../actions/ExplorerActions';
import ExplorerUtils from '../../utils/ExplorerUtils';
import ProjectUtils from '../../utils/ProjectUtils';

class Interval extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: this.getTab()
    }
  }

  setInterval(event) {
    const value = event.target.value || null;
    this.props.handleChange('interval', value);
  }

  intervalFieldsToggled(toggleState){
    if (toggleState && !this.props.interval) {
      this.props.handleChange('interval', 'daily');
    }
  }

  intervalUpdateFn(updates) {
    this.props.handleChange('interval', updates['interval']);
  }

  intervalGetFn(attr) {
    if (attr === 'interval') {
      return this.props.interval;
    } else {
      throw new Error("Interval component is only aware of interval attributes")
    }
  }

  getTab() {
    if (!this.props.interval || this.props.interval.indexOf('every') === -1) {
      return 'absolute';
    }
    return 'custom';
  }

  getCustomInterval(interval = '', index = 1) {
    if (!interval) return;
    const intervalSplitted = interval.split('_');
    return intervalSplitted[index];
  }

  updateCustomInterval({
    value = this.getCustomInterval(this.props.interval, 1),
    units = this.getCustomInterval(this.props.interval, 2)
  }) {
    const customIntervalValue = `every_${value}_${units}`;
    this.props.handleChange('interval', customIntervalValue);
  }

  setCustomValue(e) {
    this.updateCustomInterval({ value: e.target.value });
  }

  setCustomUnits(e) {
    this.updateCustomInterval({ units: e.target.value });
  }

  // React Methods

  render() {
    return (
      <div className="field-component timeframe">
        <FieldsToggle ref="interval-toggle"
                      name="Interval"
                      initialOpenState={this.props.interval}
                      attrsToStore={'interval'}
                      getFn={(x) => this.intervalGetFn(x)}
                      updateFn={(x) => this.intervalUpdateFn(x)}
                      toggleCallback={(x) => this.intervalFieldsToggled(x)}>

          <ul className="nav nav-pills" role="tablist">
            <li className={this.state.tab === 'absolute' ? 'active' : ''}>
              <a href="#" className="relative-tab" data-type="absolute"
                onClick={(event) => {
                  this.setState({ tab: 'absolute' });
                  event.preventDefault();
                }}>Absolute</a>
            </li>
            <li className={this.state.tab === 'custom' ? 'active' : ''}>
              <a href="#" className="absolute-tab" data-type="custom"
                onClick={(event) => {
                  this.setState({ tab: 'custom' });
                  event.preventDefault();
                }}>Custom</a>
            </li>
          </ul>

          {
            this.state.tab === 'absolute' &&
            <Select label={false}
                    name="interval"
                    classes="interval-type"
                    options={ProjectUtils.getConstant('ABSOLUTE_INTERVAL_TYPES')}
                    emptyOption={true}
                    handleSelection={(e) => this.setInterval(e)}
                    selectedOption={this.props.interval}
                    sort={false} />
          }

          {
            this.state.tab === 'custom' &&
            <div className="flex row flex-row">
              <div className="label-small col-xs-4">
                Every
              </div>
              <Input label={false}
                     name="interval-custom-value"
                     classes="form-collapse-left form-collapse-right col-xs-4"
                     type="number"
                     onChange={(e) => this.setCustomValue(e)}
                     placeholder="e.g. 1"
                     value={this.getCustomInterval(this.props.interval, 1) || ""}
                     autoComplete="off" />
              <Select label={false}
                name="interval-custom"
                classes="col-xs-4 interval-type form-collapse-left form-collapse-right"
                options={ProjectUtils.getConstant('RELATIVE_INTERVAL_TYPES')}
                emptyOption={true}
                handleSelection={(e) => this.setCustomUnits(e)}
                selectedOption={this.getCustomInterval(this.props.interval, 2)}
                sort={false} />
             </div>
           }

        </FieldsToggle>
      </div>
    );
  }
}

export default Interval;
