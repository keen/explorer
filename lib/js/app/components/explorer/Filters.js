import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';

import { getThemeForSelect } from '../../utils/style';
import { fetchSchema } from '../../redux/actionCreators/client';

import {
  getPropertyType,
  getPropertyValue,
} from '../../utils/filter';

import {
  updateUI,
  updateStepUI,
  addFilter,
  deleteFilter,
  updateFilter,
  addStepFilter,
  deleteStepFilter,
  updateStepFilter,
} from '../../redux/actionCreators/ui';

import {
  FILTER_OPERATORS,
  DATA_TYPES,
  DEFAULT_TIMEFRAME_ABSOLUTE_VALUE,
} from '../../consts';

const mapStateToProps = state => (
  {
    schemas: state.collections.schemas,
    eventCollection: state.ui.eventCollection,
    filters: state.ui.filters,
    steps: state.ui.steps,
  }
);

const mapDispatchToProps = {
  fetchSchema,
  updateUI,
  updateStepUI,
  addFilter,
  deleteFilter,
  updateFilter,
  addStepFilter,
  deleteStepFilter,
  updateStepFilter,
};

const schemaPropConvert = (prop) => {
  const schemaProps = {
    num: 'Number',
    string: 'String',
    bool: 'Boolean',
    datetime: 'Datetime',
    null: 'String',
    list: 'List',
    geo: 'List',
    array: 'List',
  };
  return schemaProps[prop];
};


class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  convertDateToString(valueSelected) {
    const value = valueSelected || moment(moment().format('YYYY-MM-DD'));
    const valueConverted = `${value.format('YYYY-MM-DD')}T${value.format('HH:mm')}:00.000Z`;
    return valueConverted;
  }

  renderFilterValue({
    item,
    step,
    operator,
    propertyType,
    propertyValue,
    onChange,
  }) {
    const {
      startDateFocused,
    } = this.state;
 
    const BooleanOptions = ['true', 'false'].map(item => {
      return {
        label: item,
        value: item,
      };
    });

    if (operator === 'exists'
    || propertyType === 'Boolean'
    ) {
      return (<Select
      value={{
        label: propertyValue,
        value: propertyValue,
      }}
      options={BooleanOptions}
      onChange={({ value }) => {
        onChange(value);
      }}
      theme={getThemeForSelect}
    />);
    }

    const falseFunc = () => false; // https://github.com/airbnb/react-dates/issues/239
    const startDate = moment.utc(propertyValue || DEFAULT_TIMEFRAME_ABSOLUTE_VALUE);

    if (propertyType === 'Datetime'
    ) {
      return (<div className='datetime-pickers'>
           <SingleDatePicker
            date={startDate}
            onDateChange={(valueSelected) => {
              const valueConverted = this.convertDateToString(valueSelected);
              onChange(valueConverted);
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
              onChange(valueConverted);
            }}
          />
      </div>);
    }

    if (operator === 'within'
    ) {
      let newPropertyValue = {
        coordinates: [undefined, undefined],
        maxDistanceMiles: undefined,
      };
      if (propertyValue) {
        newPropertyValue = {
          ...propertyValue,
        };
      }
      const long = newPropertyValue.coordinates[0] || '';
      const lat = newPropertyValue.coordinates[1] || '';
      const radius = newPropertyValue.maxDistanceMiles || '';

      return (<div className='within-inputs'>
           <input
      placeholder='Longitude'
      type='text'
      onChange={(e) => {
        onChange({
          coordinates: [e.target.value, lat],
          maxDistanceMiles: radius,
        });
      }}
      value={long}
   />
   <input
     placeholder='Latitude'
      type='text'
      onChange={(e) => {
        onChange({
          coordinates: [long, e.target.value],
          maxDistanceMiles: radius,
        });
      }}
      value={lat}
   />
   <input
     placeholder='Radius [in miles]'
      type='text'
      onChange={(e) => {
        onChange({
          coordinates: [long, lat],
          maxDistanceMiles: e.target.value,
        });
      }}
      value={radius}
   />
      </div>);
    }

    let placeholder;

    if (operator === 'in') {
      placeholder = 'Eve, "Tom Cruize", Teresa';
      if (propertyType === 'Number') {
        placeholder = '1, 2, 3, 4';
      };
    }

   return (<input
     placeholder={placeholder}
      type='text'
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={propertyValue}
   />);

  }

  render() {
    const {
      // component props
      funnel,
      step,

      // ui state
      steps,

      // dispatchers
      addFilter,
      deleteFilter,
      updateFilter,
      addStepFilter,
      deleteStepFilter,
      updateStepFilter,
    } = this.props;
    let {
      // ui state
      filters,
      schemas,
      eventCollection,
    } = this.props;

  let schema = schemas[eventCollection] || {};

  if (funnel) {
    filters = steps[step].filters || [];
    schema = schemas[steps[step].eventCollection] || {};
    eventCollection = steps[step].eventCollection;
  }

    if (!Object.keys(schema).length) {
      return (
        <div className='box-info'>Choose an event collection first</div>
      );
    }
    filters = filters.map(filter => {
      const propertyType = getPropertyType({
        schema,
        filter,
      });
      const propertyValue = getPropertyValue({
        propertyType,
        filter,
      });
      return {
        ...filter,
        propertyType,
        propertyValue,
      };
    });

    return (
      <div>
      <div className='list'>
        {
          filters.map((item, index) => {
            const {
              propertyName,
              propertyType,
              propertyValue,
              operator,
            } = item;

            const dataType = propertyType || schemaPropConvert(schema[propertyName]);
            const filterOperators = FILTER_OPERATORS.filter(item => item.dataTypes.includes(dataType));

            return (
              <div className='row' key={index}>
                <div className='row-part'>
                  <Select
                    value={{
                      label: propertyName,
                      value: propertyName,
                    }}
                    options={
                      Object.keys(schema).map(colItem => ({ label: colItem, value: colItem }))
                    }
                    onChange={(e) => {
                      if (funnel) {
                        updateStepFilter({
                          step,
                          payload: {
                            index,
                            item: {
                              ...item,
                              propertyName: e.value,
                              propertyType: schemaPropConvert(schema[e.value]),
                            },
                          },
                        });
                        return;
                      }
                      updateFilter({
                        index,
                        item: {
                          ...item,
                          propertyName: e.value,
                          propertyType: schemaPropConvert(schema[e.value]),
                        },
                      });
                    }}
                    theme={getThemeForSelect}
                  />
                </div>

                <div className='row-part'>
                  <Select
                    value={{
                      label: propertyType,
                      value: propertyType,
                    }}
                    options={DATA_TYPES}
                    onChange={(e) => {
                      if (funnel) {
                        updateStepFilter({
                          step,
                          payload: {
                            index,
                            item: {
                              ...item,
                              propertyType: e.value,
                              propertyValue: undefined,
                              operator: undefined,
                            },
                          },
                        });
                        return;
                      }
                      updateFilter({
                        index,
                        item: {
                          ...item,
                          propertyType: e.value,
                          propertyValue: undefined,
                          operator: undefined,
                        },
                      });
                    }}
                    theme={getThemeForSelect}
                  />
                </div>

                <div className='row-part'>
                  <Select
                    value={{
                      label: operator,
                      value: operator,
                    }}
                    options={filterOperators}
                    onChange={(e) => {
                      let newPropertyValue = propertyValue;
                      if (e.value === 'exists') {
                        newPropertyValue = 'true';
                      }

                      if (funnel) {
                        updateStepFilter({
                          step,
                          payload: {
                            index,
                            item: {
                              ...item,
                              operator: e.value,
                              propertyValue: newPropertyValue,
                            },
                          },
                        });
                        return;
                      }
                      updateFilter({
                        index,
                        item: {
                          ...item,
                          operator: e.value,
                          propertyValue: newPropertyValue,
                        },
                      });
                    }}
                    theme={getThemeForSelect}
                  />
                </div>

                <div className='row-part'>
                  {
                    this.renderFilterValue({
                      item,
                      step,
                      operator,
                      propertyType,
                      propertyValue,
                      onChange: (value) => {
                      if (funnel) {
                        updateStepFilter({
                          step,
                          payload: {
                            index,
                            item: {
                              ...item,
                              propertyValue: value,
                            },
                          },
                        });
                        return;
                      }
                      updateFilter({
                        index,
                        item: {
                          ...item,
                          propertyValue: value,
                        },
                      });
                    },

                    })
                  }
                </div>

                <div className='row-part no-flex'>
                  <a
                    className='delete'
                    onClick={() => {
                      if (funnel) {
                        deleteStepFilter({
                          step,
                          payload: {
                            index,
                          },
                        });
                        return;
                      }
                      deleteFilter(index);
                    }}
                  >
                    <i className='fas fa-times'></i>
                  </a>
                </div>

              </div>
            );
          })
        }
        </div>
        <div className='action-buttons'>
        <div
          className='button-add-filter'
          onClick={() => {
            if (funnel) {
              addStepFilter({
                step,
              });
              return;
            }
            addFilter();
          }}>
            <i className='fas fa-plus' /> Add filter
        </div>
        {
          this.props.children
        }
      </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filters);
