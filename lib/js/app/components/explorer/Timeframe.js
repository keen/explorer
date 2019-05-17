import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';

import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    timeframe: state.ui.timeframe,
    timeframeActiveTab: state.ui.timeframeActiveTab,
    timezone: state.ui.timezone,
  }
);

const mapDispatchToProps = {
  updateUI,
};

import {
  RELATIVITY_UNITS,
  TIME_UNITS,
  DEFAULT_TIMEFRAME_RELATIVE_VALUE,
  DEFAULT_TIMEFRAME_ABSOLUTE_VALUE,
  TAB_TIMEFRAME_RELATIVE,
  TAB_TIMEFRAME_ABSOLUTE,
  TIMEZONES,
} from '../consts';


class Timeframe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRelative() {
    const {
      timeframe = DEFAULT_TIMEFRAME_RELATIVE_VALUE,
      updateUI,
    } = this.props;

    if (typeof timeframe === 'object') return;

    const relativity = timeframe.split('_')[0];
    const numberOfUnits = timeframe.split('_')[1];
    const units = timeframe.split('_')[2];

    const description = `The last
      ${numberOfUnits}
      ${units}
      ${
        relativity === 'this' ?
          'including' : 'excluding'
      }
      the current day`;

    return (
      <Fragment>
        <div className='relative'>
          <Select
            value={{
              label: relativity,
              value: relativity,
            }}
            options={RELATIVITY_UNITS.map(item => ({ label: item, value: item }))}
            onChange={(selectedRelativity) => {
              updateUI({
                timeframe: `${selectedRelativity.value}_${numberOfUnits}_${units}`,
              });
            }}
            className='relativity'
          />
          <input
            type='number'
            value={numberOfUnits}
            onChange={
                    (e) => {
                      updateUI({
                        timeframe: `${relativity}_${e.target.value}_${units}`,
                      });
                    }
                  }
                  placeholder='Eg. 1'
                  className='inputNumber'
          />
          <Select
            value={{
              label: units,
              value: units,
            }}
            options={TIME_UNITS.map(item => ({ label: item, value: item }))}
            onChange={(selectedTimeUnits) => {
              updateUI({
                timeframe: `${relativity}_${numberOfUnits}_${selectedTimeUnits.value}`,
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

  convertDateToString(valueSelected) {
    const value = valueSelected || moment(moment().format('YYYY-MM-DD'));
    const valueConverted = `${value.format('YYYY-MM-DD')}T${value.format('HH:mm')}:00.000Z`;
    return valueConverted;
  }

  renderAbsolute() {
    const {
      timeframe = DEFAULT_TIMEFRAME_ABSOLUTE_VALUE,
      updateUI,
    } = this.props;
    const {
      startDateFocused,
      endDateFocused,
    } = this.state;
    const falseFunc = () => false; // https://github.com/airbnb/react-dates/issues/239

    if (typeof timeframe === 'string') return;

    const startDate = moment.utc(timeframe.start);
    const endDate = moment.utc(timeframe.end);

    return (
      <div className='tabAbsolute'>
        <div className='line'>
          <div className='title'>Start</div>
          <SingleDatePicker
            date={startDate}
            onDateChange={(valueSelected) => {
              const valueConverted = this.convertDateToString(valueSelected);
              updateUI({
                timeframe: {
                  ...timeframe,
                  start: valueConverted,
                },
              });
            }}
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
            value={startDate}
            onChange={(valueSelected) => {
              const valueConverted = this.convertDateToString(valueSelected);
              updateUI({
                timeframe: {
                  ...timeframe,
                  start: valueConverted,
                },
              });
            }}
          />
        </div>
        <div className='line'>
          <div className='title'>End</div>
          <SingleDatePicker
            date={endDate}
            onDateChange={(valueSelected) => {
              const valueConverted = this.convertDateToString(valueSelected);
              updateUI({
                timeframe: {
                  ...timeframe,
                  end: valueConverted,
                },
              });
            }}
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
            value={endDate}
            onChange={(valueSelected) => {
              const valueConverted = this.convertDateToString(valueSelected);
              updateUI({
                timeframe: {
                  ...timeframe,
                  end: valueConverted,
                },
              });
            }}
          />
        </div>
    </div>
    );
  }

  render() {
    const {
      timeframeActiveTab,
      timezone,
      updateUI,
    } = this.props;

    const timezoneOption = TIMEZONES.find(item => item.value === timezone);

    return (
      <Fragment>
      <div className='timeframe'>
        <div className='label'>Timeframe</div>
        <div className='tabs'>
          <div className={`tab ${timeframeActiveTab === TAB_TIMEFRAME_RELATIVE ? 'active' : '' }`}
            onClick={() => updateUI({
              timeframeActiveTab: TAB_TIMEFRAME_RELATIVE,
              timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE,
            })}>Relative</div>
          <div className={`tab ${timeframeActiveTab === TAB_TIMEFRAME_ABSOLUTE ? 'active' : '' }`}
            onClick={() => updateUI({
              timeframeActiveTab: TAB_TIMEFRAME_ABSOLUTE,
              timeframe: {
                ...DEFAULT_TIMEFRAME_ABSOLUTE_VALUE,
              },
            })}>Absolute</div>
          </div>
        <div
          className='tab-content'
        >
          { timeframeActiveTab === TAB_TIMEFRAME_RELATIVE && this.renderRelative() }
          { timeframeActiveTab === TAB_TIMEFRAME_ABSOLUTE && this.renderAbsolute() }
        </div>
      </div>
      <Select
      value={{
        label: `Timezone: ${timezoneOption.label}`,
        value: timezoneOption.value,
      }}
      options={TIMEZONES}
      onChange={(e) => {
        updateUI({
          timezone: e.value,
        });
        localStorage.setItem('timezone', e.value);
      }}
      />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeframe);
