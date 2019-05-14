import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import SelectTargetProperty from './explorer/SelectTargetProperty';

import {
  fetchProject,
  fetchSchema,
  query,
} from '../redux/actionCreators/client';
import {
  updateUI,
  resetUI,
  togglePanelSave,
  changeEventCollection,
} from '../redux/actionCreators/ui';

import Dataviz from './explorer/Dataviz';
import JsonView from './explorer/JsonView';
import Foldable from './explorer/Foldable';
import Timeframe from './explorer/Timeframe';
import Interval from './explorer/Interval';
import Filters from './explorer/Filters';
import GroupBy from './explorer/GroupBy';
import EmbedHTML from './explorer/EmbedHTML';
import SavedQuery from './explorer/SavedQuery';
import SavedQueryBrowser from './explorer/SavedQueryBrowser';
import Extraction from './explorer/Extraction';

import { getChartTypeOptions } from '../utils/chartTypes';
import {
  b64EncodeUnicode,
  b64DecodeUnicode,
} from '../utils/base64';
import { copyToClipboard } from '../utils/text';

import {
  ANALYSIS_TYPES,
  TIMEZONES,
  PANEL_NEW_QUERY,
  PANEL_BROWSE,
  TAB_EXTRACTION_BULK,
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
  resetUI,
  togglePanelSave,
  changeEventCollection,
};

class App extends Component {
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
      history.pushState({}, '', url.toString());
    }

    const {
      eventCollection,
      autoload,
      savedQuery,
      analysisType,
    } = this.props.ui;

    if (prevProps.collections.items.length !== this.props.collections.items.length
      && !Object.keys(this.props.collections.schema).length
    ) {
      this.props.fetchSchema({
        collection: eventCollection,
      });
    }

    if (autoload) {
      ui.autoload = false;
      updateUI({
        autoload: false,
      });

      if (analysisType === 'extraction') {
        // don't autoload extractions
        return;
      }

      const savedQueryName = savedQuery && savedQuery.name;
      this.runQuery({
        savedQueryName,
      });
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
      latest,
      propertyNames,
      email,
      extractionActiveTab,
    } = this.props.ui;

    let queryParams = {
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

    if (analysisType === 'extraction') {
      queryParams = {
        ...queryParams,
        latest,
        propertyNames,
      };

      if (extractionActiveTab === TAB_EXTRACTION_BULK) {
        queryParams.email = email;
      }
    }

    return queryParams;
  }

  runQuery(payload) {
    this.props.query({
      ...payload,
      ...this.getQueryParams(),
    });
  }

  render() {
    const {
      collections,
      queries,
      updateUI,
      resetUI,
      fetchSchema,
      togglePanelSave,
      changeEventCollection,
    } = this.props;
    const {
      activePanel,
      analysisType,
      eventCollection,
      showTargetProperty,
      targetProperty,
      timezone,
      timeframeData,
      interval,
      groupBy,
      chartType,
      modalFilters,
      modalEmbedHTML,
      error,
      filters,
      fetching,
      panelSave,
      extractionActiveTab,
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

    return (
      <div className='keenExplorer' >
        <div className='panel'>
          <div className='panel-buttons tabs'>
          <div
              className={`tab button button-new-query`}
              onClick={() => {
                resetUI();
              }}
            >
              <i
                className='fa fa-plus'
              />
            </div>
            <div
              className={`tab button ${activePanel === PANEL_NEW_QUERY ? 'active' : ''}`}
              onClick={() => updateUI({
                activePanel: PANEL_NEW_QUERY,
              })}
            >Query
            </div>
            <div
              className={`tab button ${activePanel === PANEL_BROWSE ? 'active' : ''}`}
              onClick={() => updateUI({
                activePanel: PANEL_BROWSE,
              })}
            >Browse</div>
          </div>
          <div className={
            `panel-content ${activePanel !== PANEL_NEW_QUERY ? 'hide' : ''}`
          }>
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
              fetchSchema({
                collection: e.label,
              });
              changeEventCollection({
                eventCollection: e.label,
              });
            }}
        />

          { showTargetProperty && eventCollection &&
            <SelectTargetProperty
              value={selectedTargetProperty}
              eventCollection={eventCollection}
            />
          }

          { analysisType === 'extraction' && eventCollection &&
            <Extraction />
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
            onClick={() => updateUI({
              modalFilters: true,
            })}
            className='filters foldable'
          >
            <div className='title'>Filters</div>
            { !!filters.length &&
              <div className='count'>{filters.length}</div>
            }
          </div>
          <Modal
            isOpen={modalFilters}
            onRequestClose={() => updateUI({
              modalFilters: false,
            })}
            contentLabel='Example Modal'
           >
            <div className='filters-container modal'>
              <div className='header'>
                <div className='title'>Filters</div>
                <div
                  className='x'
                  onClick={() => updateUI({
                    modalFilters: false,
                  })}
                >x</div>
              </div>
              <Filters />
            </div>
          </Modal>

        <Foldable
          title='Group By - Order By'
          defaultActive={!!groupBy}
          onClose={
            () => {
              updateUI({
                groupBy: undefined,
                orderBy: undefined,
                limit: undefined,
                numberOfGroupByProps: 1,
              });
            }
          }>
          <GroupBy />
        </Foldable>

        <Foldable
          title='Interval'
          defaultActive={!!interval}
          onClose={
            () => {
              updateUI({
                interval: undefined,
              });
            }
          }>
          <Interval />
        </Foldable>

        <div className='apiQueryUrl' onClick={() => copyToClipboard(queryURL)}>
          <span>API Query URL</span>
          <input type='text' value={queryURL} />
          <i className="fas fa-copy"></i>
        </div>

        </div>


        <div
          className={
            `panel-content ${activePanel !== PANEL_BROWSE ? 'hide' : ''}`
          }>
          <SavedQueryBrowser
            client={client}
          />
        </div>

        </div>


        <div className='result'>
          { !hasResults &&
          <div className='lets-go'>
            Let's go exploring!
          </div>
          }

          { hasResults &&
            <div className=''>
              <div className='preview'>
                { chartType === 'JSON' && <JsonView />}
                { chartType !== 'JSON' &&
                <Fragment>
                 <Dataviz />
                 <button
                  className='button-download button-embed-html'
                  onClick={() => {
                    updateUI({
                      modalEmbedHTML: true,
                    });
                  }} >
                  <i className='fas fa-code' /> Embed HTML
                </button>
                <Modal
                  isOpen={modalEmbedHTML}
                  onRequestClose={() => {
                    updateUI({
                      modalEmbedHTML: false,
                    });
                  }}
                >
                  <div className='modal'>
                    <div className='header'>
                      <div className='title'>Embed HTML</div>
                      <div className='x' onClick={() => {
                    updateUI({
                      modalEmbedHTML: false,
                    });
                  }}>x</div>
                    </div>
                    <EmbedHTML
                      projectId={projectId}
                      readKey={readKey}
                    />
                  </div>
                </Modal>
                </Fragment>
                }
                <div className='select-chart-type-container'>
                <Select
                   className='select-chart-type'
                   value={chartTypeSelected}
                   options={chartTypes.map(item => ({ label: item, value: item }))}
                   onChange={(e) => {
                     updateUI({
                       chartType: e.value,
                     });
                   }}
                  />
                </div>
              </div>
            </div>
           }

          {
            error &&
            <div className='error'>
              {error.body}
            </div>
          }

            <button
            className='button-run-query'
            onClick={() => this.runQuery()}>
            {
              fetching &&
              <i className='fas fa-circle-notch fa-spin' />
            }
            {
              !(analysisType === 'extraction' && extractionActiveTab === TAB_EXTRACTION_BULK)
              && <Fragment>
                Run Query
              </Fragment>
            }
            {
              (analysisType === 'extraction' && extractionActiveTab === TAB_EXTRACTION_BULK)
              && <Fragment>
                Extract to Email
              </Fragment>
            }
            </button>

          {
            analysisType !== 'extraction' &&
            <Fragment>
            <div
            className={
              `button-toggle ${panelSave ? 'button-toggle-active' : ''}`
            }
            onClick={() => togglePanelSave()}>
            Save as...
            </div>
            </Fragment>
          }
          
          { panelSave &&
            <SavedQuery
            client={client}
            queryParams={queryParams}
          />
          }

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
  mapDispatchToProps,
)(App);
