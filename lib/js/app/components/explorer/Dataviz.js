import React, { Component, Fragment } from 'react';

import KeenDataviz from 'keen-dataviz';
import 'keen-dataviz/dist/keen-dataviz.css';

export class Dataviz extends Component {
  componentDidMount(){
    this.generateChart();
  }

  componentDidUpdate(){
    this.generateChart();
  }

  generateChart(){
    const { results } = this.props.queries;
    if (results) {
      console.log('draw');
      new KeenDataviz({
        container: '#keen-dataviz-container',
        // title: 'New Customers per Week',
        title: false,
        showLoadingSpinner: true,
        results
      });
    }
  }

  render(){
    return (
      <div className='keen-dataviz-container' id='keen-dataviz-container'></div>
    );
  }
}
