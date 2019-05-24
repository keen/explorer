import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';

import { getThemeForSelect } from '../../utils/style';

import {
  updateUI,
  updateStepUI,
} from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    timeframe: state.ui.timeframe,
    timezone: state.ui.timezone,
    steps: state.ui.steps,
  }
);

const mapDispatchToProps = {
  updateUI,
  updateStepUI,
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
    let {
      timeframe = DEFAULT_TIMEFRAME_RELATIVE_VALUE,
    } = this.props;
    const {
      steps,
      funnel,
      step,
      updateUI,
      updateStepUI,
    } = this.props;

   // if (typeof timeframe === 'object') return;

    if (funnel) {
      timeframe = steps[step].timeframe;
    }

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

    const update = (payload) => {
      if (funnel) {
         updateStepUI({
          step,
          payload,
        });
        return;
      }

      updateUI(payload);
    };

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
                update({
                  timeframe: `${selectedRelativity.value}_${numberOfUnits}_${units}`,
                });
            }}
            className='relativity'
            theme={getThemeForSelect}
          />
          <input
            type='number'
            value={numberOfUnits}
            onChange={
                    (e) => {
                        update({
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
              update({
                timeframe: `${relativity}_${numberOfUnits}_${selectedTimeUnits.value}`,
              });
            }}
            className='units'
            theme={getThemeForSelect}
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
    let {
      timeframe = DEFAULT_TIMEFRAME_ABSOLUTE_VALUE,
    } = this.props;
    const {
      funnel,
      step,
      steps,
      updateUI,
      updateStepUI,
    } = this.props;
    const {
      startDateFocused,
      endDateFocused,
    } = this.state;
    const falseFunc = () => false; // https://github.com/airbnb/react-dates/issues/239

    if (funnel) {
      timeframe = steps[step].timeframe;
    }

    const startDate = moment.utc(timeframe.start);
    const endDate = moment.utc(timeframe.end);

    const update = (value) => {
      const payload = {
        timeframe: {
          ...timeframe,
          ...value,
        },
      };

      if (funnel) {
        updateStepUI({
          step,
          payload,
        });
        return;
      }

      updateUI(payload);
    };

    return (
      <div className='tabAbsolute'>
        <div className='line'>
          <div className='title'>Start</div>
          <SingleDatePicker
            date={startDate}
            onDateChange={(valueSelected) => {
              const valueConverted = this.convertDateToString(valueSelected);
              update({
                  ...timeframe,
                  start: valueConverted,
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
              update({
                  ...timeframe,
                  start: valueConverted,
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
              update({
                  ...timeframe,
                  end: valueConverted,
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
              update({
                  ...timeframe,
                  end: valueConverted,
              });
            }}
          />
        </div>
    </div>
    );
  }

  render() {
    const {
      // props
      funnel,
      step,

      // redux state
      steps,

      // dispatchers
      updateUI,
      updateStepUI,
    } = this.props;

    let {
      timeframe,
      timezone,
    } = this.props;

    if (funnel) {
      timeframe = steps[step].timeframe;
      timezone = steps[step].timezone;
    }

    let timeframeActiveTab;

    if (typeof timeframe === 'string') {
      timeframeActiveTab = TAB_TIMEFRAME_RELATIVE;
    }

    if (typeof timeframe === 'object') {
      timeframeActiveTab = TAB_TIMEFRAME_ABSOLUTE;
    }

    const timezoneOption = TIMEZONES.find(item => item.value === timezone) || {
      label: 'UTC',
      value: 0,
    };

    return (
      <Fragment>
      <div className='timeframe'>
        <div className='label'>Timeframe</div>
        <div className='tabs'>
          <div className={`tab ${timeframeActiveTab === TAB_TIMEFRAME_RELATIVE ? 'active' : '' }`}
            onClick={() => {
              if (funnel) {
                updateStepUI({
                  step,
                  payload: {
                    timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE,
                  },
                });
                return;
              }
              updateUI({
                timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE,
              });
            }}>Relative</div>
          <div className={`tab ${timeframeActiveTab === TAB_TIMEFRAME_ABSOLUTE ? 'active' : '' }`}
            onClick={() => {
              if (funnel) {
                updateStepUI({
                  step,
                  payload: {
                    timeframe: { ...DEFAULT_TIMEFRAME_ABSOLUTE_VALUE },
                  },
                });
                return;
              }
              
              updateUI({
                timeframe: {
                  ...DEFAULT_TIMEFRAME_ABSOLUTE_VALUE,
                },
            });
          }}>Absolute</div>
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
          localStorage.setItem('timezone', e.value);
          updateUI({
            timezone: e.value,
          });
          if (funnel) {
            updateStepUI({
              step,
              payload: {
                timezone: e.value,
              }
            });
          }
        }}
        theme={getThemeForSelect}
      />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeframe);
