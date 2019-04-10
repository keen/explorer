import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Prism from 'prismjs';

import SelectTargetProperty from './explorer/SelectTargetProperty';

import {
  fetchProject,
  fetchSchema,
  query,
} from '../redux/actionCreators/client';
import { updateUI } from '../redux/actionCreators/ui';

import Dataviz from './explorer/Dataviz';
import JsonView from './explorer/JsonView';
import Foldable from './explorer/Foldable';
import Timeframe from './explorer/Timeframe';
import Interval from './explorer/Interval';
import Filters from './explorer/Filters';
import GroupBy from './explorer/GroupBy';

import { getChartTypeOptions } from '../utils/ChartTypes';
import {
  b64EncodeUnicode,
  b64DecodeUnicode,
} from '../utils/base64';
import { copyToClipboard } from '../utils/text';
import { exportToCsv } from '../utils/csv';

import {
  ANALYSIS_TYPES,
  TIMEZONES,
} from './consts';

import { client } from '../app';

const mapStateToProps = state => ({
  collections: state.collections,
  queries: state.queries,
  ui: state.ui,
});

const mapDispatchToProps = {
  fetchProject,
  fetchSchema,
  query,
  updateUI,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {},
    };
  }

  componentDidMount() {
    this.props.fetchProject();
    Modal.setAppElement(this.props.container);

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (searchParams) {
      const UIencodedState = searchParams.get('state');
      if (UIencodedState) {
        const preloadState = JSON.parse(b64DecodeUnicode(UIencodedState));
        preloadState.autoload = true;
        this.props.updateUI(preloadState);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { ui } = this.props;
    const UIencodedState = b64EncodeUnicode(JSON.stringify(ui));
    const url = new URL(window.location.href);
    const query_string = url.search;
    const search_params = new URLSearchParams(query_string);
    const UIencodedStateOld = search_params.get('state');
    if (UIencodedState !== UIencodedStateOld) {
      search_params.set('state', UIencodedState);
      url.search = search_params.toString();
      history.pushState({}, "", url.toString());
    }

    const {
      eventCollection,
      autoload,
    } = this.props.ui;

    if (prevProps.collections.items.length !== this.props.collections.items.length
      && !Object.keys(this.props.collections.schema).length
    ) {
      this.props.fetchSchema({
        collection: eventCollection
      });
    }

    if (autoload) {
      ui.autoload = false;
      updateUI({
        autoload: false
      });
      this.runQuery();
    }
  }

  getQueryParams() {
    const {
      analysisType,
      eventCollection,
      targetProperty,
      timeframe,
      timezone,
      filters,
      interval,
      groupBy,
      orderBy,
      limit,
    } = this.props.ui;

    const queryParams = {
      analysisType,
      eventCollection,
      timeframe,
      timezone,
      ...{
        interval,
        targetProperty,
        filters,
        groupBy,
        orderBy,
        limit,
      },
    };

    return queryParams;
  }

  openModal(modalName) {
    this.setState({
      modal: {
        [modalName]: true,
      },
    });
  }

  closeModal(modalName) {
    this.setState({
      modal: {
        [modalName]: undefined,
      },
    });
  }

  runQuery() {
    this.props.query(this.getQueryParams());
  }

  render() {
    const {
      collections,
      queries,
      updateUI,
      fetchSchema,
    } = this.props;
    const {
      analysisType,
      eventCollection,
      showTargetProperty,
      targetProperty,
      timezone,
      timeframeData,
      interval,
      groupBy,
      chartType,
    } = this.props.ui;
    const selectedAnalysisType = {
      label: analysisType,
      value: analysisType,
    };
    const selectedEventCollection = {
      label: eventCollection,
      value: eventCollection,
    };
    const selectedTargetProperty = {
      label: targetProperty,
      value: targetProperty,
    };

    const queryParams = this.getQueryParams();

    const chartTypes = getChartTypeOptions(queryParams);
    const hasResults = queries && queries.results;

    let chartTypeSelected = chartTypes.length && { label: chartTypes[0], value: chartTypes[0] };
    if (chartType) {
      chartTypeSelected = { label: chartType, value: chartType };
    }

    const timezoneOption = TIMEZONES.find(item => item.value === timezone);
    const selectedTimezone = {
      label: `Timezone: ${timezoneOption.label}`,
      value: timezoneOption.value,
    };

    const urlParams = Object.keys(queryParams).map((k) => {
      const queryParamValue = queryParams[k];
      if (!queryParamValue) return null;
      const underscoredK = k.replace(/(?:^|\.?)([A-Z])/g, (x,y) => `_${y.toLowerCase()}`).replace(/^_/, '');
      return `${encodeURIComponent(underscoredK)}=${encodeURIComponent(queryParams[k])}`;
    }).filter(item => !!item).join('&');

    const queryURL = `${client.config.protocol}://${client.config.host}/3.0/projects/${client.config.projectId}/queries/${analysisType}?api_key=${client.config.masterKey}&${urlParams}`;

    const { readKey, projectId } = this.props.keenAnalysis.config;

    const code = `<html>
    <head>
      <meta charset="utf-8">
      <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-analysis@3"></script>
      <link href="https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.css" rel="stylesheet" />
      <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.js"></script>
    </head>
    <body>
      <div id="demo_container"></div>
      <style>
        #demo_container{
          min-height: 300px;
        }
      </style>
  
      <script>
        const chart = new KeenDataviz({
          container: '#demo_container', // querySelector
          title: false
        });
  
        // Use keen-analysis.js to run a query
        const client = new KeenAnalysis({
          projectId: '${projectId}',
          readKey: '${readKey}'
        });
  
        client
          .query({
            analysisType: '${queryParams.analysisType}',
            eventCollection: ${queryParams.eventCollection && `'${queryParams.eventCollection}'`},
            timeframe: ${queryParams.timeframe && `${JSON.stringify(queryParams.timeframe)}`},
            interval: ${queryParams.interval && `'${queryParams.interval}'`},
            groupBy: ${queryParams.groupBy && `${JSON.stringify(queryParams.groupBy)}`},
            limit: ${queryParams.limit && `${queryParams.limit}`},
            orderBy: ${queryParams.orderBy && `${JSON.stringify(queryParams.orderBy)}`},
            filters: ${queryParams.filters && `${JSON.stringify(queryParams.filters)}`},
            timezone: ${queryParams.timezone && `${queryParams.timezone}`}
          })
          .then(function(results){
            chart
              .render(results);
          })
          .catch(function(error){
            chart
              .message(error.message);
          });
      </script>
    </body>
  </html>`;
    const prismedHtml = Prism.highlight(code, Prism.languages.javascript, 'javascript');

    return (
      <div className='keenExplorer' >
        <div className='panel'>
          <div className='label'>Analysis Type</div>
          <Select
            value={selectedAnalysisType}
            options={ANALYSIS_TYPES.map(item => ({ label: item.type, value: item.type }))}
            onChange={(e) => {
              updateUI({
                analysisType: e.value,
                showTargetProperty:
                  !!ANALYSIS_TYPES.find(item => item.type === e.label).targetProperty,
              });
            }}
          />
          <div className='label'>Event Collection</div>
          <Select
            value={selectedEventCollection}
            options={collections.items.map(item => ({ label: item.name, value: item.url }))}
            onChange={(e) => {
              updateUI({
                eventCollection: e.label,
                targetProperty: undefined,
              });
              fetchSchema({
                collection: e.label,
              });
            }}
        />

          { showTargetProperty && eventCollection &&
            <SelectTargetProperty
              value={selectedTargetProperty}
              eventCollection={eventCollection}
            />
          }

          <Timeframe
            value={timeframeData}
            onChange={timeframe => updateUI({
              timeframe,
            })}
          />

          <Select
            value={selectedTimezone}
            options={TIMEZONES}
            onChange={(e) => {
              updateUI({
                timezone: e.value,
              });
              localStorage.setItem('timezone', e.value);
            }}
          />

          <div
            onClick={() => this.openModal('filters')}
            className='filters foldable'
          >
            <div className='title'>Filters</div>
          </div>
          <Modal
            isOpen={this.state.modal.filters}
            onRequestClose={() => this.closeModal('filters')}
            contentLabel='Example Modal'
           >
            <div className='filters-container'>
              <div className='header'>
                <div className='title'>Filters</div>
                <div className='x' onClick={() => this.closeModal('filters')}>x</div>
              </div>
              <Filters />
            </div>
          </Modal>

        <Foldable
          title='Group By - Order By'
          defaultActive={ !!groupBy }
          onClose={
            () => {
              updateUI({
                groupBy: undefined,
                orderBy: undefined,
                limit: undefined,
                numberOfGroupByProps: 1
              });
            }
          }>
          <GroupBy />
        </Foldable>

        <Foldable
          title='Interval'
          defaultActive={ !!interval }
          onClose={
            () => {
              updateUI({
                interval: undefined
              });
            }
          }>
          <Interval
            onChange={ (interval) => updateUI({
              interval
            }) }
          />
        </Foldable>

        <div className='apiQueryUrl' onClick={() => copyToClipboard(queryURL)}>
          <span>API Query URL</span>
          <input type='text' value={queryURL} />
          <i className="fas fa-copy"></i>
        </div>

        </div>

        <div className='result'>
          { !hasResults &&
          <div className='letsGo'>
            Let's go exploring!
          </div>
          }


          { hasResults &&
            <div className=''>
              <div className='preview'>
                { chartType === 'JSON' && <JsonView />}
                { chartType !== 'JSON' && <Dataviz /> }
              </div>
              <Select
                value={ chartTypeSelected }
                options={ chartTypes.map(item => ({ label: item, value: item }) ) }
                onChange={ (e) => {
                  updateUI({
                    chartType: e.value,
                  });
                }}
                className='chartType'
                />
             </div>
           }

          <button
            className='button-run-query'
            onClick={() => this.runQuery() } >Run Query</button>

          <button
            className='button-embed-html'
            onClick={() => this.openModal('embed')} >Embed html</button>
            <Modal
              isOpen={this.state.modal.embed}
              onRequestClose={() => this.closeModal('embed')}
             >
             <div className='modal'>
               <div className='header'>
                 <div className='title'>Embed html</div>
                 <div className='x' onClick={() => this.closeModal('embed')}>x</div>
               </div>
               <div
                 className='container'
                 dangerouslySetInnerHTML={{__html: prismedHtml}} />
               </div>
               <div className='button-copy' onClick={() => copyToClipboard(code)}>
                 Copy <i className="fas fa-copy"></i>
               </div>
            </Modal>
          
          <button
            className='button-embed-html'
            onClick={() => exportToCsv(this.props.queries.results.result, 'aaa.csv')} >Download CSV</button>
        </div>

      </div>
    );
  }

}

App.propTypes = {
  todoText: PropTypes.string,
  //increment: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
