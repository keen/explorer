import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { fetchSchema } from '../../redux/actionCreators/client';
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
} from '../consts';

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

class Filters extends Component {
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
  }

    if (!Object.keys(schema).length) {
      return (
        <div className='box-info'>Choose an event collection first</div>
      );
    }

    return (
      <div className='list'>
        {
          filters.map((item, index) => {
            const {
              propertyName,
              propertyType,
              propertyValue,
              operator,
            } = item;

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
                        },
                      });
                    }}
                  />
                </div>

                <div className='row-part'>
                  <Select
                    value={{
                      label: operator,
                      value: operator,
                    }}
                    options={FILTER_OPERATORS}
                    onChange={(e) => {
                      if (funnel) {
                        updateStepFilter({
                          step,
                          payload: {
                            index,
                            item: {
                              ...item,
                              operator: e.value,
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
                        },
                      });
                    }}
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
                        },
                      });
                    }}
                  />
                </div>

                <div className='row-part'>
                  <input
                    type='text'
                    onChange={(e) => {
                      if (funnel) {
                        updateStepFilter({
                          step,
                          payload: {
                            index,
                            item: {
                              ...item,
                              propertyValue: e.target.value,
                            },
                          },
                        });
                        return;
                      }
                      updateFilter({
                        index,
                        item: {
                          ...item,
                          propertyValue: e.target.value,
                        },
                      });
                    }}
                    value={propertyValue}
                  />
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
                    <i className='fas fa-trash'></i>
                  </a>
                </div>

              </div>
            );
          })
        }
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
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filters);
