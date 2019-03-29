import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { fetchSchema } from '../../redux/actionCreators/client';
import { updateUI } from '../../redux/actionCreators/ui';

import { FILTER_OPERATORS, DATA_TYPES } from '../consts';

const mapStateToProps = state => (
  {
    collections: state.collections,
    ui: state.ui,
  }
);

const mapDispatchToProps = { fetchSchema, updateUI };

class Filters extends Component {
  componentDidMount() {
//    this.onChange();
  }

  onChange(){
    this.props.onChange({});
  }

  render(){
    const filters = [1];

    return (
      <div className='list'>
        {
          filters.map(item => {
            return (
              <div className='row'>

              <div className='rowPart'>
              <Select
              //  value = {  }
                options={
                  Object.keys(this.props.collections.schema).map(item => ({ label: item, value: item }) )
                }
                onChange={ (e) => {

                }}
              />
  </div>
  
              <div className='rowPart'>
              <Select
              //  value = {  }
                options={
                  FILTER_OPERATORS
                }
                onChange={ (e) => {

                }}
              />
  </div>

              <div className='rowPart'>

              <Select
              //  value = {  }
                options={
                  DATA_TYPES
                }
                onChange={ (e) => {

                }}
              />
  </div>

<div className='rowPart'>
              <input type='text' />
                </div>

              </div>
            );
          })
        }
        <div className='btnAdd'>+ Add another filter</div>
        <div className='btnSave'>Save</div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
