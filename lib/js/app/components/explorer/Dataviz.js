import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeenDataviz from 'keen-dataviz';
import 'keen-dataviz/dist/keen-dataviz.css';

const mapStateToProps = state => ({
  results: state.queries.results,
  type: state.ui.chartType,
});

const mapDispatchToProps = {};
class DatavizComponent extends Component {
  componentDidMount() {
    this.generateChart();
  }

  componentDidUpdate() {
    this.generateChart();
  }

  generateChart() {
    const {
      results,
      type,
    } = this.props;
    if (results) {
      console.log('draw');
      new KeenDataviz({
        container: '#keen-dataviz-container',
        type,
        // title: 'New Customers per Week',
        title: false,
        showLoadingSpinner: true,
        results,
      });
    }
  }

  render() {
    return (
      <div
        className='keen-dataviz-container'
        id='keen-dataviz-container'
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DatavizComponent);
