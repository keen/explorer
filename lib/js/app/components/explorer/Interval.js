import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    interval: state.ui.interval,
    intervalActiveTab: state.ui.intervalActiveTab,
  }
);

const mapDispatchToProps = {
  updateUI,
};

import {
  TIME_UNITS,
  INTERVALS,
  TAB_INTERVAL_STANDARD,
  TAB_INTERVAL_CUSTOM,
} from '../consts';

class Interval extends Component {
  renderStandard() {
    const { interval } = this.props;
    return (
        <div className='tab'>
          <Select
            value={{
              label: interval,
              value: interval,
            }}
            options={INTERVALS.map(item => ({ label: item, value: item }))}
            onChange={(selectedInterval) => {
                this.props.updateUI({
                  interval: selectedInterval.value,
                });
            }}
            className='standardUnits'
          />
        </div>
    );
  }

  renderCustom() {
    const { interval = '__days', updateUI } = this.props;
    const numberOfUnits = interval.split('_')[1];
    const selectedCustomInterval = interval.split('_')[2];

    return (
      <div className='tab line'>
        <div className='title'>Every</div>
        <input
          type='number'
          value={numberOfUnits}
          onChange={
            (e) => {
              updateUI({
                interval: `every_${e.target.value}_${selectedCustomInterval}`,
              });
            }
          }
          placeholder=''
          className='inputNumber'
        />
        <Select
          value={{
            label: selectedCustomInterval,
            value: selectedCustomInterval,
          }}
          options={TIME_UNITS.map(item => ({ label: item, value: item }))}
          onChange={(selectedCustomInterval) => {
            updateUI({
              interval: `every_${numberOfUnits}_${selectedCustomInterval.value}`,
            });
          }}
          className='timeUnits'
          />
    </div>
    );
  }

  render() {
    const {
      intervalActiveTab,
      updateUI,
    } = this.props;

    return (
      <div className='interval'>
          <div className='tabs'>
            <div className={`tab ${intervalActiveTab === TAB_INTERVAL_STANDARD ? 'active' : '' }`}
              onClick={() => updateUI({
                intervalActiveTab: TAB_INTERVAL_STANDARD,
                interval: undefined,
              })}>Standard</div>
            <div className={`tab ${intervalActiveTab === TAB_INTERVAL_CUSTOM ? 'active' : '' }`}
              onClick={() => updateUI({
                intervalActiveTab: TAB_INTERVAL_CUSTOM,
                interval: undefined,
              })}>Custom</div>
          </div>
          <div className='tab-content'>
            { intervalActiveTab === TAB_INTERVAL_STANDARD && this.renderStandard() }
            { intervalActiveTab === TAB_INTERVAL_CUSTOM && this.renderCustom() }
          </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Interval);
