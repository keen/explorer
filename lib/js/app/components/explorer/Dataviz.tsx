// @ts-nocheck
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { KeenDataviz } from '@keen.io/dataviz';

import { exportToCsv } from '../../utils/csv';
import { exportToJson } from '../../utils/json';

import { getSavedQueryName } from '../../modules/savedQuery';

const mapStateToProps = (state) => ({
  results: state.queries.results,
  type: state.ui.chartType,
  queryName: getSavedQueryName(state),
});

const mapDispatchToProps = {};
class DatavizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadButtons: false,
    };
    this.downloadToggleRef = React.createRef();
  }

  componentDidMount() {
    this.generateChart();
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener('click', this.handleClick, false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryName !== this.props.queryName) {
      return;
    }

    const { results, type } = this.props;
    if (
      prevProps.type !== type ||
      JSON.stringify(prevProps.results) !== JSON.stringify(results)
    ) {
      this.generateChart();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  getData() {
    return this.dataviz && this.dataviz.dataset && this.dataviz.dataset.matrix;
  }

  handleClick(e) {
    if (!this.downloadToggleRef.current.contains(e.target)) {
      this.setState({
        showDownloadButtons: false,
      });
    }
  }

  generateChart() {
    const { results, type } = this.props;

    if (results) {
      if (typeof results.result === 'string') {
        return;
      }

      try {
        this.dataviz = new KeenDataviz({
          type: type,
          container: '#keen-dataviz-container',
        }).render(results);
      } catch (err) {
        console.error(err);
      }
    }
  }

  exportToPNG() {
    return (
      this.dataviz &&
      this.dataviz.exportImage({
        bgcolor: 'white',
      })
    );
  }

  render() {
    const {
      results,
      modalEmbedHTML,
      modalFilters,
      componentDownloadButton,
    } = this.props;

    const { showDownloadButtons } = this.state;

    const filename = this.props.queryName || 'untitled-query';

    const resultIsString = typeof results.result === 'string';

    return (
      <Fragment>
        {!resultIsString && (
          <div
            className={`keen-dataviz-container ${
              modalEmbedHTML || modalFilters ? 'hide' : ''
            }`}
            id="keen-dataviz-container"
          />
        )}
        {resultIsString && (
          <div
            className={`keen-dataviz-container ${
              modalEmbedHTML || modalFilters ? 'hide' : ''
            } result-string`}
          >
            <div>{results.result}</div>
          </div>
        )}

        {componentDownloadButton && (
          <div className="download-toggle" ref={this.downloadToggleRef}>
            <div
              role="presentation"
              className="download-toggle-label"
              onClick={() => {
                this.setState({
                  showDownloadButtons: !showDownloadButtons,
                });
              }}
            >
              <i className="fas fa-download" />
              Download
            </div>
            {showDownloadButtons && (
              <div className="download-buttons">
                <button
                  className="button-download button-download-csv"
                  onClick={() => exportToCsv(this.getData(), filename)}
                >
                  CSV
                </button>
                <button
                  className="button-download button-download-json"
                  onClick={() => exportToJson(results, filename)}
                >
                  JSON
                </button>
                <button
                  className="button-download button-download-png"
                  onClick={() => this.exportToPNG()}
                >
                  PNG
                </button>
              </div>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatavizComponent);
