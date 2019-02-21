import React, { Component, Fragment } from 'react';
import Select from 'react-select';


import { TIME_UNITS, INTERVALS } from '../consts';



export class Filters extends Component {

  componentDidMount(){
//    this.onChange();
  }

  onChange(){
    this.props.onChange({});
  }

  render(){

    return (
      <div className='interval'>
          filters


      </div>
    )
  }
}
