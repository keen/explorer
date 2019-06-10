import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { getThemeForSelect } from '../../utils/style';
import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    interval: state.ui.interval,
  }
);

const mapDispatchToProps = {
  updateUI,
};

import {
  TIME_UNITS,
  INTERVALS,
  DEFAULT_STANDARD_INTERVAL,
  DEFAULT_CUSTOM_INTERVAL,
} from '../../consts';

class Interval extends Component {
  renderStandard() {
    const {
      interval,
      updateUI,
    } = this.props;
    return (
        <div className='tab'>
          <Select
            value={{
              label: interval,
              value: interval,
            }}
            options={INTERVALS.map(item => ({ label: item, value: item }))}
            onChange={(selectedInterval) => {
                updateUI({
                  interval: selectedInterval.value,
                });
            }}
            className='standard-units'
            theme={getThemeForSelect}
          />
        </div>
    );
  }

  renderCustom() {
    const {
      interval = DEFAULT_CUSTOM_INTERVAL,
      updateUI,
    } = this.props;
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
          className='input-number'
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
          className='time-units'
          theme={getThemeForSelect}
          />
    </div>
    );
  }

  render() {
    const {
      interval = '',
      updateUI,
    } = this.props;

    let isStandard = true;
    if (interval) {
      isStandard = interval.indexOf('_') === -1;
    }

    return (
      <div className='interval'>
          <div className='tabs'>
            <div className={`tab ${isStandard && 'active'}`}
              onClick={() => updateUI({
                interval: DEFAULT_STANDARD_INTERVAL,
              })}>Standard</div>
            <div className={`tab ${!isStandard && 'active' }`}
              onClick={() => updateUI({
                interval: DEFAULT_CUSTOM_INTERVAL,
              })}>Custom</div>
          </div>
          <div className='tab-content'>
            { isStandard && this.renderStandard() }
            { !isStandard && this.renderCustom() }
          </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Interval);
