import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { fetchSchema } from '../../redux/actionCreators/client';
import {
  updateUI,
  addFilter,
  deleteFilter,
  updateFilter,
} from '../../redux/actionCreators/ui';

import {
  FILTER_OPERATORS,
  DATA_TYPES,
} from '../consts';

const mapStateToProps = state => (
  {
    collections: state.collections,
    filters: state.ui.filters,
  }
);

const mapDispatchToProps = {
  fetchSchema,
  updateUI,
  addFilter,
  deleteFilter,
  updateFilter,
};

class Filters extends Component {
  componentDidMount() {
  }

  render() {
    const {
      collections,
      filters,
      updateFilter,
    } = this.props;

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
                <div className='rowPart'>
                  <Select
                    value={{
                      label: propertyName,
                      value: propertyName,
                    }}
                    options={
                      Object.keys(collections.schema).map(colItem => ({ label: colItem, value: colItem }))
                    }
                    onChange={(e) => {
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

                <div className='rowPart'>
                  <Select
                    value={{
                      label: operator,
                      value: operator,
                    }}
                    options={FILTER_OPERATORS}
                    onChange={(e) => {
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

                <div className='rowPart'>
                  <Select
                    value={{
                      label: propertyType,
                      value: propertyType,
                    }}
                    options={DATA_TYPES}
                    onChange={(e) => {
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

                <div className='rowPart'>
                  <input
                    type='text'
                    onChange={(e) => {
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

                <div className='rowPart'>
                  <a
                    className='delete'
                    onClick={() => {
                      this.props.deleteFilter(index);
                    }}
                  >
                    <i className='fas fa-times'></i>
                  </a>
                </div>

              </div>
            );
          })
        }
        <div
          className='btnAdd'
          onClick={() => {
            this.props.addFilter();
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
