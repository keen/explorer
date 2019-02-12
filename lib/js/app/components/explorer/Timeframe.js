import React, { Component, Fragment } from 'react';
import Select from 'react-select';

import { TIME_UNITS } from '../consts';

const TAB_STANDARD = 0;
const TAB_CUSTOM = 1;

export class Interval extends Component {
  constructor(props){
    super(props);

    this.state = {

    };
  }

  componentDidMount(){
    this.props.onChange();
  }

  updateQueryTimeframe(){
    const {
      selectedRelativity,
      selectedTimeUnits,
      numberOfUnits,
      activeTab,
      startDate,
      startTime,
      endDate,
      endTime
    } = this.state;

    // absolute timeframe
    if (activeTab === TAB_ABSOLUTE) {
      this.props.onChange({
        start: `${startDate.format('YYYY-MM-DD')}T${startTime.format('HH:mm')}:00.000Z`,
        end: `${endDate.format('YYYY-MM-DD')}T${endTime.format('HH:mm')}:00.000Z`
      });
      return;
    }

    // relative
    if (!selectedRelativity || !selectedTimeUnits || !numberOfUnits) {
      return;
    }
    const timeframe = `${selectedRelativity.value}_${numberOfUnits}_${selectedTimeUnits.value}`;
    this.props.onChange(timeframe);
  }

  renderStandard(){
    return (
        <div className='relative'>
                <Select
                  value={this.state.selectedRelativity}
                  options={TIME_UNITS.map(item => ({ label: item, value: item }))}
                  onChange={ (selectedRelativity) => {
                    this.setState({ selectedRelativity }, () => {
                  //    this.updateQueryTimeframe();
                    })
                  }}
                  className='relativity'
                  />
          </div>
    );
  }

  renderCustom(){
    const {
      startDate,
      startDateFocused,
      startTime,
      endDate,
      endDateFocused,
      endTime
    } = this.state;
    const falseFunc = ()=>false; // https://github.com/airbnb/react-dates/issues/239
    return (
      <div className='tabAbsolute'>

    </div>
    );
  }

  render(){
    const { activeTab } = this.state;

    return (
      <div className='timeframe'>
          <div className='label'>Timeframe</div>
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
