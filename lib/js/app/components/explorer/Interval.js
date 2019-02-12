import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import moment from 'moment';

import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import { RELATIVITY_UNITS, TIME_UNITS, TIMEFRAME_TABS } from '../consts';

const TAB_RELATIVE = 0;
const TAB_ABSOLUTE = 1;

export class Interval extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeTab: TAB_RELATIVE,

      selectedRelativity: {
        label: RELATIVITY_UNITS[0],
        value: RELATIVITY_UNITS[0]
      },
      selectedTimeUnits: {
        label: TIME_UNITS[2],
        value: TIME_UNITS[2]
      },
      numberOfUnits: '14',

      startDate: moment().subtract(1, 'day'),
      endDate: moment(),
      startTime: moment(moment().format('YYYY-MM-DD')),
      endTime: moment(moment().format('YYYY-MM-DD')),
    };
  }

  componentDidMount(){
    this.updateQueryTimeframe();
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
      this.props.updateTimeframe({
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
    this.props.updateTimeframe(timeframe);
  }

  renderRelative(){
    const description = `The last
      ${ this.state.numberOfUnits }
      ${ this.state.selectedTimeUnits.value }
      ${
        this.state.selectedRelativity.value === 'this' ?
          'including' : 'excluding'
      }
      the current day`;

    return (
      <Fragment>
        <div className='relative'>
                <Select
                  value={this.state.selectedRelativity}
                  options={RELATIVITY_UNITS.map(item => ({ label: item, value: item }))}
                  onChange={ (selectedRelativity) => {
                    this.setState({ selectedRelativity }, () => {
                      this.updateQueryTimeframe();
                    })
                  }}
                  className='relativity'
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
                  placeholder='Eg. 1'
                  className='inputNumber'
                />
                <Select
                  value={this.state.selectedTimeUnits}
                  options={TIME_UNITS.map(item => ({ label: item, value: item }))}
                  onChange={ (selectedTimeUnits) => {
                    this.setState({ selectedTimeUnits }, () => {
                      this.updateQueryTimeframe();
                    });
                  }}
                  className='units'
              />
      </div>
      <div className='description'>
        {description}
      </div>
      </Fragment>
    );
  }

  renderAbsolute(){
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
        <div className='line'>
          <div className='title'>Start</div>
          <SingleDatePicker
            date={startDate}
            onDateChange={startDate => this.setState({ startDate }, () => this.updateQueryTimeframe())}
            focused={startDateFocused}
            onFocusChange={({ focused }) => this.setState({ startDateFocused: focused })}
            isOutsideRange={falseFunc}
            id='your_unique_id'
            numberOfMonths={1}
            displayFormat={'YYYY-MM-DD'}
          />
          <TimePicker
            use12Hours={true}
            showSecond={false}
            minuteStep={15}
            defaultValue={startTime}
            onChange={(value) => this.setState({ startTime: value }, () => this.updateQueryTimeframe())}
          />
        </div>
        <div className='line'>
          <div className='title'>End</div>
          <SingleDatePicker
            date={endDate}
            onDateChange={endDate => this.setState({ endDate }, () => this.updateQueryTimeframe())}
            focused={endDateFocused}
            onFocusChange={({ focused }) => this.setState({ endDateFocused: focused })}
            isOutsideRange={falseFunc}
            id='your_unique_id2'
            numberOfMonths={1}
            displayFormat={'YYYY-MM-DD'}
          />
          <TimePicker
            use12Hours={true}
            showSecond={false}
            minuteStep={15}
            defaultValue={endTime}
            onChange={(value) => this.setState({ endTime: value }, () => this.updateQueryTimeframe())}
          />
        </div>
    </div>
    );
  }

  render(){
    const { activeTab } = this.state;

    return (
      <div className='timeframe'>
          <div className='label'>Timeframe</div>
          <div className='tabs'>
            <div className={`tab ${activeTab === TAB_RELATIVE ? 'active' : '' }`}
              onClick={() => this.setState({ activeTab: TAB_RELATIVE })}>Relative</div>
            <div className={`tab ${activeTab === TAB_ABSOLUTE ? 'active' : '' }`}
              onClick={() => this.setState({ activeTab: TAB_ABSOLUTE })}>Absolute</div>
          </div>
          <div className='tabContent'>
            { activeTab === TAB_RELATIVE && this.renderRelative() }
            { activeTab === TAB_ABSOLUTE && this.renderAbsolute() }
          </div>
      </div>
    )
  }
}
