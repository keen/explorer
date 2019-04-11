import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import KeenDataviz from 'keen-dataviz';
import 'keen-dataviz/dist/keen-dataviz.css';

import { exportToCsv } from '../../utils/csv';
import { exportToJson } from '../../utils/json';

const mapStateToProps = state => ({
  results: state.queries.results,
  type: state.ui.chartType,
  queryName: state.ui.queryName,
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
      this.dataviz = new KeenDataviz({
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
    const data = this.dataviz && this.dataviz.dataset && this.dataviz.dataset.matrix;
    const { results } = this.props;
    const filename = this.props.queryName || 'untitled-query';

    return (
      <Fragment>
        <div
          className='keen-dataviz-container'
          id='keen-dataviz-container'
        />
        <button
          className='button-download-csv'
          onClick={() => exportToCsv(data, filename)} >Download as CSV</button>
        <button
          className='button-download-json'
          onClick={() => exportToJson(results, filename)} >Download as JSON</button>

      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DatavizComponent);
