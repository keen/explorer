import React, { Component, Fragment } from 'react';
import Select from 'react-select';

import { TIME_UNITS, INTERVALS } from '../consts';

const TAB_STANDARD = 0;
const TAB_CUSTOM = 1;

export class Interval extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeTab: TAB_STANDARD,
      selectedInterval: {
        label: INTERVALS[2],
        value: INTERVALS[2]
      },
      numberOfUnits: 1,
      selectedCustomInterval: {
        label: TIME_UNITS[2],
        value: TIME_UNITS[2]
      },
    };
  }

  componentDidMount(){
    this.onChange();
  }

  onChange(){
    const {
      activeTab,
      selectedInterval,
      numberOfUnits,
      selectedCustomInterval
    } = this.state;

    let interval = selectedInterval.value;

    if (activeTab === TAB_CUSTOM) {
      interval = `every_${numberOfUnits}_${selectedCustomInterval.value}`;
    }

    this.props.onChange(interval);
  }

  renderStandard(){
    return (
        <div className='tab'>
          <Select
            value={this.state.selectedInterval}
            options={INTERVALS.map(item => ({ label: item, value: item }))}
            onChange={ (selectedInterval) => {
              this.setState({ selectedInterval }, () => {
                this.onChange();
              })
            }}
            className='standardUnits'
          />
        </div>
    );
  }

  renderCustom(){
    return (
      <div className='tab line'>
        <div className='title'>Every</div>
        <input type='number'
          value={this.state.numberOfUnits}
          onChange={
            (e) => {
              this.setState({ numberOfUnits: e.target.value }, () => {
                this.onChange();
              })
            }
          }
          placeholder='Eg. 1'
          className='inputNumber'
        />
        <Select
          value={this.state.selectedCustomInterval}
          options={TIME_UNITS.map(item => ({ label: item, value: item }))}
          onChange={ (selectedCustomInterval) => {
            this.setState({ selectedCustomInterval }, () => {
              this.onChange();
            })
          }}
          className='timeUnits'
          />
    </div>
    );
  }

  render(){
    const { activeTab } = this.state;

    return (
      <div className='interval'>
          <div className='tabs'>
            <div className={`tab ${activeTab === TAB_STANDARD ? 'active' : '' }`}
              onClick={() => this.setState({ activeTab: TAB_STANDARD })}>Standard</div>
            <div className={`tab ${activeTab === TAB_CUSTOM ? 'active' : '' }`}
              onClick={() => this.setState({ activeTab: TAB_CUSTOM })}>Custom</div>
          </div>
          <div className='tabContent'>
            { activeTab === TAB_STANDARD && this.renderStandard() }
            { activeTab === TAB_CUSTOM && this.renderCustom() }
          </div>
      </div>
    )
  }
}
