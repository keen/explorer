import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import KeenDataviz from 'keen-dataviz';
import 'keen-dataviz/dist/keen-dataviz.css';

import { exportToCsv } from '../../utils/csv';
import { exportToJson } from '../../utils/json';

const mapStateToProps = state => ({
  results: state.queries.results,
  type: state.ui.chartType,
  queryName: state.ui.savedQuery.name,
});

const mapDispatchToProps = {};
class DatavizComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.generateChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryName !== this.props.queryName) {
      return;
    }
    this.generateChart();
  }

  generateChart() {
    const {
      results,
      type,
    } = this.props;
    if (results) {
      console.log('draw chart');
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
          className={`keen-dataviz-container`}
          id='keen-dataviz-container'
        />
        <button
          className='button-download button-download-csv'
          onClick={() => exportToCsv(data, filename)} >
          <i className='fas fa-download'></i> CSV</button>
        <button
          className='button-download button-download-json'
          onClick={() => exportToJson(results, filename)} >
          <i className='fas fa-download'></i> JSON</button>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DatavizComponent);
