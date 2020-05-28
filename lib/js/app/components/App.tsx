// @ts-nocheck
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { getThemeForSelect } from '../utils/style';
import { convertFilterValuesToJsonValues } from '../utils/filter';
import SelectTargetProperty from './explorer/SelectTargetProperty';

import {
  fetchProject,
  fetchSchema,
  saveQuery,
  deleteQuery,
  query,
} from '../redux/actionCreators/client';

import {
  updateUI,
  updateStepUI,
  resetUI,
  addStep,
} from '../redux/actionCreators/ui';

import { createNewQuery } from '../modules/queries';
import { resetSavedQuery } from '../modules/savedQuery';
import { persistState, loadPersitedState } from '../modules/app';

import EventCollection from './explorer/EventCollection';
import PreviewCollection from './explorer/PreviewCollection';
import Timeframe from './explorer/Timeframe';
import Extraction from './explorer/Extraction';
import { Percentile } from './QueryCreator';
import Filters from './explorer/Filters';
import GroupBy from './explorer/GroupBy';
import Interval from './explorer/Interval';
import APIQueryURL from './explorer/APIQueryURL';
import Step from './explorer/Step';
import ActorProperty from './explorer/ActorProperty';
import SavedQueryBrowser from './explorer/SavedQueryBrowser';

import Dataviz from './explorer/Dataviz';
import JsonView from './explorer/JsonView';
import Foldable from './explorer/Foldable';
import EmbedHTML from './explorer/EmbedHTML';

import QuerySettings from './QuerySettings';
import RunQuery from './RunQuery';
import Confirm from './Confirm';

import { QueryActions, SettingsContainer } from './App.styles';

import { getChartTypeOptions } from '../utils/charts';

import { composeQueryParams } from '../utils/transforms';

import {
  ANALYSIS_TYPES,
  PANEL_NEW_QUERY,
  PANEL_BROWSE,
  TAB_EXTRACTION_BULK,
  DEFAULT_STANDARD_INTERVAL,
} from '../consts';

import { client } from '../KeenExplorer';

const mapStateToProps = (state, props) => ({
  collections: state.collections,
  queries: state.queries,
  ui: state.ui,
  savedQuery: state.savedQuery,
  steps: state.ui.steps,
  components: {
    ...state.ui.components,
    ...props.components,
  },
});

const mapDispatchToProps = {
  fetchProject,
  fetchSchema,
  saveQuery,
  deleteQuery,
  persistState,
  loadPersitedState,
  resetSavedQuery,
  createNewQuery,
  query,
  updateUI,
  updateStepUI,
  resetUI,
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
    const appState = {
      features,
    };
    if (localStorage) {
      const { projectId } = props.keenAnalysis.config;
      if (!localStorage.projectId || localStorage.projectId !== projectId) {
        localStorage.setItem('projectId', projectId);
        localStorage.removeItem('eventCollection');
        props.updateUI({
          eventCollection: undefined,
        });
        appState.isProjectChanged = true;
      }
    }
    this.state = appState;
  }

  componentDidMount() {
    this.props.fetchProject();
    Modal.setAppElement(this.props.container);

    if (this.state.isProjectChanged) return;
    this.props.loadPersitedState();
  }

  componentDidUpdate(prevProps) {
    const { ui, fetchSchema } = this.props;

    this.props.persistState();

    const {
      autoload,

      analysisType,
      steps,
    } = this.props.ui;
    const { savedQuery } = this.props;
    let {
      // ui state
      eventCollection,
    } = this.props.ui;

    if (analysisType === 'funnel') {
      eventCollection = steps[0] && steps[0].eventCollection;
    }

    if (
      prevProps.collections.items.length !==
        this.props.collections.items.length &&
      !Object.keys(this.props.collections.schemas).length
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
      contentEncoding,
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
        propertyNames, // API is not set to work with it
      };

      if (extractionActiveTab === TAB_EXTRACTION_BULK) {
        queryParams.email = email;
        queryParams.content_encoding = contentEncoding;
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
    let params = {
      ...this.getQueryParams(),
    };

    if (params.analysisType === 'funnel') {
      const updatedSteps = params.steps.map((step) => ({
        ...step,
        ...convertFilterValuesToJsonValues(step),
      }));
      params = {
        ...params,
        steps: [...updatedSteps],
        filters: undefined,
      };
    }

    this.props.query({
      ...payload,
      ...params,
      //  includeMetadata: true
    });
  }

  renderFiltersFoldable({ step, funnel } = {}) {
    const { updateUI } = this.props;
    const { modalFilters, steps } = this.props.ui;
    let { filters, eventCollection } = this.props.ui;

    if (funnel) {
      filters = steps[step].filters;
      eventCollection = steps[step].eventCollection;
    }

    const onCloseModal = () => {
      updateUI({
        modalFilters: false,
      });
    };

    return (
      <Fragment>
        <div
          onClick={() => {
            if (!eventCollection) {
              return;
            }
            updateUI({
              modalFilters: true,
            });
          }}
          className="filters foldable"
        >
          <div className="title">Filters</div>
          {!!filters.length && <div className="count">{filters.length}</div>}
        </div>
        <Modal
          isOpen={modalFilters}
          onRequestClose={() => onCloseModal()}
          contentLabel=""
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <div className="filters-container modal-main">
            <div className="header">
              <div className="title">Filters</div>
            </div>
            <Filters
              funnel={funnel}
              step={step}
              onCloseModal={() => onCloseModal()}
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
      addStep,

      // from config props
      previewCollection,
      saveStateToLocalStorage,

      //UI components
      components,
    } = this.props;
    const { features } = this.state;
    const {
      activePanel,
      analysisType,
      eventCollection,
      targetProperty,
      interval,
      groupBy,
      chartType,
      modalEmbedHTML,
      modalPreviewCollection,
      error,
      fetching,
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

    let chartTypeSelected = chartTypes.length && {
      label: chartTypes[0],
      value: chartTypes[0],
    };

    if (chartType) {
      chartTypeSelected = { label: chartType, value: chartType };
    }

    const chartTypesSorted = chartTypes
      .sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      .map((item) => ({ label: item, value: item }));

    const { readKey, projectId } = this.props.keenAnalysis.config;

    const showTargetProperty = !!ANALYSIS_TYPES.find(
      (item) => item.type === analysisType
    ).targetProperty;

    return (
      <div className="keen-explorer">
        <div className="panel-main">
          <div className="panel-buttons tabs">
            <div
              className="tab button button-new-query"
              onClick={() => {
                this.props.createNewQuery();
                this.props.resetSavedQuery();
                resetUI();
              }}
            >
              <i className="fa fa-plus" />
            </div>
            <div
              className={`tab button ${
                activePanel === PANEL_NEW_QUERY ? 'active' : ''
              }`}
              onClick={() =>
                updateUI({
                  activePanel: PANEL_NEW_QUERY,
                })
              }
            >
              Query
            </div>
            {components.savedQueryBrowser && (
              <div
                className={`tab button ${
                  activePanel === PANEL_BROWSE ? 'active' : ''
                }`}
                onClick={() =>
                  updateUI({
                    activePanel: PANEL_BROWSE,
                  })
                }
              >
                Browse
              </div>
            )}
          </div>
          <div
            className={`panel-content ${
              activePanel !== PANEL_NEW_QUERY ? 'hide' : ''
            } panel-${analysisType}`}
          >
            {analysisType !== 'funnel' && components.eventCollection && (
              <EventCollection
                saveStateToLocalStorage={
                  saveStateToLocalStorage.eventCollection
                }
              />
            )}

            {components.previewCollections &&
              previewCollection &&
              analysisType !== 'funnel' && (
                <Fragment>
                  <div
                    className="a-preview-collection"
                    onClick={() => {
                      updateUI({
                        modalPreviewCollection: true,
                      });
                    }}
                  >
                    <i className="fas fa-search" /> Preview Collections
                  </div>
                  <Modal
                    isOpen={modalPreviewCollection}
                    onRequestClose={() => {
                      updateUI({
                        modalPreviewCollection: false,
                      });
                    }}
                    style={{
                      overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <div className="modal-main">
                      <div className="header">
                        <div className="title">Preview Collections</div>
                        <div
                          className="x"
                          onClick={() => {
                            updateUI({
                              modalPreviewCollection: false,
                            });
                          }}
                        >
                          x
                        </div>
                      </div>
                      <PreviewCollection />
                    </div>
                  </Modal>
                </Fragment>
              )}

            {components.analysisType && (
              <Fragment>
                <div className="label-main label-analysis-type">
                  Analysis type
                </div>
                <Select
                  value={selectedAnalysisType}
                  options={ANALYSIS_TYPES.map((item) => ({
                    label: item.type,
                    value: item.type,
                  }))}
                  onChange={(e) => {
                    updateUI({
                      analysisType: e.value,
                    });
                  }}
                  theme={getThemeForSelect}
                />
              </Fragment>
            )}

            {showTargetProperty && eventCollection && (
              <SelectTargetProperty
                value={selectedTargetProperty}
                eventCollection={eventCollection}
              />
            )}

            {analysisType === 'extraction' && eventCollection && <Extraction />}

            {analysisType === 'percentile' && eventCollection && (
              <Percentile
                value={this.props.ui.percentile}
                onReset={() =>
                  updateUI({
                    percentile: undefined,
                  })
                }
                onChange={(value) => {
                  updateUI({
                    percentile: value,
                  });
                }}
              />
            )}

            {analysisType === 'funnel' && steps && (
              <div className="funnel">
                {steps.map((step, index) => {
                  return (
                    <Step key={index} index={index} className="">
                      <EventCollection funnel={true} step={index} />
                      <ActorProperty step={index} />
                      <Timeframe funnel={true} step={index} />
                      {this.renderFiltersFoldable({
                        funnel: true,
                        step: index,
                      })}
                    </Step>
                  );
                })}
                <div onClick={() => addStep()} className="button button-add">
                  <i className="fas fa-plus" /> Add a step
                </div>
              </div>
            )}

            {analysisType !== 'funnel' && (
              <Fragment>
                {components.timeframe && (
                  <Timeframe componentTimezone={components.timezone} />
                )}
                {components.filters && this.renderFiltersFoldable()}
              </Fragment>
            )}

            {analysisType !== 'extraction' && analysisType !== 'funnel' && (
              <Fragment>
                {components.groupBy && (
                  <Foldable
                    title="Group By - Order By"
                    defaultActive={!!groupBy}
                    onClose={() => {
                      updateUI({
                        groupBy: undefined,
                        orderBy: undefined,
                        limit: undefined,
                        numberOfGroupByProps: 1,
                      });
                    }}
                  >
                    <GroupBy />
                  </Foldable>
                )}

                {components.interval && (
                  <Foldable
                    title="Interval"
                    defaultActive={!!interval}
                    onOpen={() => {
                      updateUI({
                        interval: DEFAULT_STANDARD_INTERVAL,
                      });
                    }}
                    onClose={() => {
                      updateUI({
                        interval: undefined,
                      });
                    }}
                  >
                    <Interval />
                  </Foldable>
                )}

                {components.apiQueryUrl && (
                  <APIQueryURL queryParams={queryParams} client={client} />
                )}
              </Fragment>
            )}
          </div>

          <div
            className={`panel-content panel-saved-queries ${
              activePanel !== PANEL_BROWSE ? 'hide' : ''
            }`}
          >
            <SavedQueryBrowser client={client} features={features} />
          </div>
        </div>

        {components.results && (
          <div className="result">
            {!hasResults && <div className="lets-go">Let's go exploring!</div>}

            {hasResults && (
              <div className="preview">
                {chartType === 'JSON' && <JsonView />}
                {chartType !== 'JSON' && (
                  <Fragment>
                    <Dataviz
                      componentDownloadButton={components.downloadButton}
                    />
                    {components.embedButton && (
                      <button
                        className="button-download button-embed-html"
                        onClick={() => {
                          updateUI({
                            modalEmbedHTML: true,
                          });
                        }}
                      >
                        <i className="fas fa-code" /> Embed HTML
                      </button>
                    )}
                    <Modal
                      isOpen={modalEmbedHTML}
                      onRequestClose={() => {
                        updateUI({
                          modalEmbedHTML: false,
                        });
                      }}
                      style={{
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        },
                      }}
                    >
                      <div className="modal-main">
                        <div className="header">
                          <div className="title">Embed HTML</div>
                          <div
                            className="x"
                            onClick={() => {
                              updateUI({
                                modalEmbedHTML: false,
                              });
                            }}
                          >
                            x
                          </div>
                        </div>
                        <EmbedHTML projectId={projectId} readKey={readKey} />
                      </div>
                    </Modal>
                  </Fragment>
                )}
                <div className="select-chart-type-container">
                  <Select
                    className="select-chart-type"
                    value={chartTypeSelected}
                    options={chartTypesSorted}
                    onChange={(e) => {
                      updateUI({
                        chartType: e.value,
                      });
                    }}
                    theme={getThemeForSelect}
                  />
                </div>
              </div>
            )}

            {error && Object.keys(error).length !== 0 && (
              <div className="error">{error.body}</div>
            )}

            <QueryActions>
              <RunQuery isLoading={fetching} onClick={() => this.runQuery()}>
                {analysisType === 'extraction' &&
                extractionActiveTab === TAB_EXTRACTION_BULK
                  ? 'Extract to Email'
                  : 'Run Query'}
              </RunQuery>
              <SettingsContainer>
                <QuerySettings
                  onDelete={(name) => {
                    this.props.deleteQuery({ name });
                  }}
                  onSave={(name, refreshRate) => {
                    const params = composeQueryParams(
                      this.props.ui.analysisType,
                      queryParams
                    );

                    const body = {
                      query: convertFilterValuesToJsonValues(params),
                      metadata: {
                        displayName: name,
                        visualization: {
                          chartType: this.props.ui.chartType,
                          stepLabels: this.props.ui.stepLabels || [],
                        },
                      },
                      refreshRate: refreshRate * 60 * 60,
                    };

                    this.props.saveQuery({
                      name,
                      body,
                    });
                  }}
                />
              </SettingsContainer>
            </QueryActions>
          </div>
        )}
        <Confirm />
      </div>
    );
  }
}

App.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
