import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import parse from 'csv-parse/lib/es5/sync';

import { getThemeForSelect } from '../utils/style';
import SelectTargetProperty from './explorer/SelectTargetProperty';

import {
  fetchProject,
  fetchSchema,
  query,
} from '../redux/actionCreators/client';
import {
  updateUI,
  updateStepUI,
  resetUI,
  togglePanelSave,
  changeEventCollection,
  addStep,
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
import Percentile from './explorer/Percentile';
import EventCollection from './explorer/EventCollection';
import Step from './explorer/Step';
import ActorProperty from './explorer/ActorProperty';

import { getChartTypeOptions } from '../utils/chartTypes';
import {
  b64EncodeUnicode,
  b64DecodeUnicode,
} from '../utils/base64';
import { copyToClipboard } from '../utils/text';

import {
  ANALYSIS_TYPES,
  PANEL_NEW_QUERY,
  PANEL_BROWSE,
  TAB_EXTRACTION_BULK,
  DEFAULT_STANDARD_INTERVAL,
} from '../consts';

import { client } from '../app';

const mapStateToProps = state => ({
  collections: state.collections,
  queries: state.queries,
  ui: state.ui,
  steps: state.ui.steps,
});

const mapDispatchToProps = {
  fetchProject,
  fetchSchema,
  query,
  updateUI,
  updateStepUI,
  resetUI,
  togglePanelSave,
  changeEventCollection,
  addStep,
};

const defaultFeatures = {
  save: true,
};

class App extends Component {
  constructor(props) {
    super(props);
    const features = {
      ...defaultFeatures,
      ...(props.features || {}),
    };
    this.state = {
      features,
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
        if (preloadState.analysisType !== 'extraction') {
          // don't autoload extractions
          preloadState.autoload = true;
        }
        this.props.updateUI(preloadState);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      // state
      ui,

      // dispatchers
      fetchSchema,
    } = this.props;
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
    } = this.props.ui;

    if (prevProps.collections.items.length !== this.props.collections.items.length
      && !Object.keys(this.props.collections.schemas).length
    ) {
      fetchSchema({
        eventCollection,
      });
    }

    if (autoload) {
      ui.autoload = false;
      updateUI({
        autoload: false,
      });

      fetchSchema({
        eventCollection,
      });

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
      percentile,
      steps,
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
        percentile,
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

    if (analysisType === 'funnel') {
      queryParams = {
        ...queryParams,
        steps,
      };
    }

    return queryParams;
  }

  runQuery(payload) {
    const params = {
      ...this.convertFilterValuesToJsonValues(this.getQueryParams()),
    };
    console.log(params);
    this.props.query({
      ...payload,
      ...params,
    });
  }

  convertFilterValuesToJsonValues(params) {
    const filters = params.filters.map(({ propertyName, propertyType, operator, propertyValue }) => {
      let value;
      if (propertyType === 'String' || propertyType === 'Datetime') {
        value = propertyValue;
      }
      if (
        propertyType === 'Boolean'
        || operator === 'exists'
      ) {
        value = (propertyValue === 'true');
      }
      else if (operator === 'in') {
        value = parse(propertyValue, {
          quote: '"',
          ltrim: true,
          rtrim: true,
          delimiter: ',',
        })[0];

        if (propertyType === 'Number') {
          value = value.map(val => val.replace(/['"]+/g, '')); // backwards compatible '1', '2'...
        }
      }
      else if (propertyType === 'Number'
      ) {
        value = parseFloat(propertyValue);
      }
      else if (propertyType === 'List'
      ) {
        value = propertyValue;
        if (operator === 'within') {
          const long = parseFloat(propertyValue.coordinates[0] || 0);
          const lat = parseFloat(propertyValue.coordinates[1] || 0);
          const radius = parseFloat(propertyValue.maxDistanceMiles || 0);
          value = {
            coordinates: [long, lat],
            maxDistanceMiles: radius,
          };
        }
      }

      if (operator === 'Null' 
      ) {
        value = null;
      }

      return {
        propertyName,
        propertyType,
        operator,
        propertyValue: (value === null ? null: value),
      };
    });

    console.log(filters);

    return {
      ...params,
      filters: [
        ...filters,
      ],
    };
  }

  renderFiltersFoldable({ step, funnel } = {}) {
    const {
      updateUI,
    } = this.props;
    const {
      modalFilters,
      steps,
    } = this.props.ui;
    let {
      filters,
    } = this.props.ui;

    if (funnel) {
      filters = steps[step].filters;
    }

    const onCloseModal = () => {
      const validFilters = filters.filter(filter => !!filter.propertyName);
      if (funnel) {
        updateStepUI({
          step,
          payload: {
            filters: validFilters,
          },
          rootPayload: {
            modalFilters: false,
          },
        });
        return;
      }
      updateUI({
        modalFilters: false,
        filters: validFilters,
      });
    };

    return (
      <Fragment>
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
      onRequestClose={() => onCloseModal()}
      contentLabel='Example Modal'
     >
      <div className='filters-container modal'>
        <div className='header'>
          <div className='title'>Filters</div>
          <div
            className='x'
            onClick={() => onCloseModal()}
          >x</div>
        </div>
        <Filters
          funnel={funnel}
          step={step}
        />
      </div>
      </Modal>
      </Fragment>
    );
  }

  render() {
    const {
      queries,
      updateUI,
      resetUI,
      togglePanelSave,
      addStep,
    } = this.props;
    const {
      features,
    } = this.state;
    const {
      activePanel,
      analysisType,
      eventCollection,
      showTargetProperty,
      targetProperty,
      interval,
      groupBy,
      chartType,
      modalEmbedHTML,
      error,
      fetching,
      panelSave,
      extractionActiveTab,
      steps,
    } = this.props.ui;
    const selectedAnalysisType = {
      label: analysisType,
      value: analysisType,
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
          <div className='label'>Analysis type</div>
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
            theme={getThemeForSelect}
          />

          {
            analysisType !== 'funnel' &&
            <EventCollection />
          }
          
          { showTargetProperty && eventCollection &&
            <SelectTargetProperty
              value={selectedTargetProperty}
              eventCollection={eventCollection}
            />
          }

          { analysisType === 'extraction' && eventCollection &&
            <Extraction />
          }

          { analysisType === 'percentile' && eventCollection &&
            <Percentile />
          }

          { analysisType === 'funnel' && steps &&
          <div className='funnel'>
          { steps.map((step, index) => {
            return (
              <Step
                key={index}
                index={index}
                className=''>
                <EventCollection
                  funnel={true}
                  step={index}/>
                <ActorProperty
                  step={index}/>
                <Timeframe
                  funnel={true}
                  step={index}/>
                { this.renderFiltersFoldable({
                  funnel: true,
                  step: index,
                }) }
              </Step>
            );
          }) }
          <div
          onClick={() => addStep()}
          className='button button-add'>
          <i className='fas fa-plus' /> Add a step
          </div>
          </div>
          }

          { analysisType !== 'funnel' &&
            <Fragment>
            <Timeframe />
            { this.renderFiltersFoldable() }
            </Fragment>
          }

          {
          analysisType !== 'extraction' &&
          analysisType !== 'funnel' &&

          <Fragment>
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
          onOpen={
            () => {
              updateUI({
                interval: DEFAULT_STANDARD_INTERVAL,
              });
            }
          }
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
            <input type='text' defaultValue={queryURL} />
            <i className="fas fa-copy"></i>
          </div>

          </Fragment>
          }

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
                   theme={getThemeForSelect}
                  />
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
            features.save
            && analysisType !== 'extraction'
            &&
            <div
            className={
              `button-toggle ${panelSave ? 'button-toggle-active' : ''}`
            }
            onClick={() => togglePanelSave()}>
            Save as...
            </div>
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
