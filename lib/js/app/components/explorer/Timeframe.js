import React, { Component, Fragment } from 'react';
import Select from 'react-select';

import { RELATIVITY_UNITS, TIME_UNITS, TIMEFRAME_TABS } from '../consts';

export class Timeframe extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedRelativity: null,
      selectedTimeUnits: null,
      numberOfUnits: '',
    };
  }

  updateQueryTimeframe(){
    const {
      selectedRelativity,
      selectedTimeUnits,
      numberOfUnits
    } = this.state;
    if (!selectedRelativity || !selectedTimeUnits || !numberOfUnits) {
      return;
    }
    const timeframe = `${selectedRelativity.value}_${numberOfUnits}_${selectedTimeUnits.value}`;
    this.props.updateTimeframe(timeframe);
  }

  render(){
    return (
      <div>
          <div className='label'>Timeframe</div>
            <Select
              value={this.state.selectedRelativity}
              options={RELATIVITY_UNITS.map(item => ({ label: item, value: item }))}
              onChange={ (selectedRelativity) => {
                this.setState({ selectedRelativity }, () => {
                  this.updateQueryTimeframe();
                })
              }}
              />
            <input type='number'
              value={this.state.numberOfUnits}
              onChange={
                (e) => {
                  this.setState({ numberOfUnits: e.target.value }, () => {
                    this.updateQueryTimeframe();
                  })
                }
              }
              placeholder='Eg. 1'/>
            <Select
              value={this.state.selectedTimeUnits}
              options={TIME_UNITS.map(item => ({ label: item, value: item }))}
              onChange={ (selectedTimeUnits) => {
                this.setState({ selectedTimeUnits }, () => {
                  this.updateQueryTimeframe();
                });
              }}
          />
      </div>
    )
  }
}
