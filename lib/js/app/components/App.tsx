// @ts-nocheck
import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Alert } from '@keen.io/ui-core';

import {
  fetchProject,
  fetchSchema,
  saveQuery,
  deleteQuery,
} from '../redux/actionCreators/client';

import {
  updateUI,
  updateStepUI,
  resetUI,
  addStep,
} from '../redux/actionCreators/ui';

import {
  createNewQuery,
  runQuery,
  getError,
  getQueryResults,
  getQueryPerformState,
} from '../modules/queries';
import { resetSavedQuery } from '../modules/savedQuery';
import QueryCreator from '../queryCreator';
import { persistState, loadPersitedState } from '../modules/app';

import APIQueryURL from './explorer/APIQueryURL';
import SavedQueryBrowser from './explorer/SavedQueryBrowser';

import QuerySettings from './QuerySettings';
import QueryVisualization from './QueryVisualization';
import VisualizationPlaceholder from './VisualizationPlaceholder';
import RunQuery, { runQueryLabel } from './RunQuery';
import Confirm from './Confirm';

import { QueryActions, SettingsContainer } from './App.styles';

import { PANEL_NEW_QUERY, PANEL_BROWSE } from '../consts';

import { client } from '../KeenExplorer';

const mapStateToProps = (state, props) => ({
  collections: state.collections,
  queries: state.queries,
  eventCollection: state.ui.eventCollection,
  ui: state.ui,
  savedQuery: state.savedQuery,
  isQueryLoading: getQueryPerformState(state),
  queryResults: getQueryResults(state),
  queryError: getError(state),
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
  runQuery,
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
      query: {},
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

    if (this.state.isProjectChanged) return;
    this.props.loadPersitedState();
  }

  runQuery(payload) {
    console.log('RUN QUERY', payload);
    this.props.runQuery({
      ...payload,
    });
  }

  render() {
    const {
      queries,
      updateUI,
      resetUI,
      //UI components
      components,
    } = this.props;
    const { features } = this.state;
    const {
      activePanel,
      analysisType,
      chartType,
      modalEmbedHTML,
      queryError,
      extractionActiveTab,
    } = this.props.ui;

    const { readKey, projectId } = this.props.keenAnalysis.config;

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
            <QueryCreator
              projectId={this.props.keenAnalysis.config.projectId}
              readKey={this.props.keenAnalysis.config.readKey}
              masterKey={this.props.keenAnalysis.config.masterKey}
              onUpdateQuery={(query) => {
                console.log(query, 'query');
                this.setState({ query });
                this.props.persistState({ query });
              }}
            />
            {components.apiQueryUrl && (
              <APIQueryURL queryParams={this.state.query} client={client} />
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

        <div className="result">
          {this.props.queryResults ? (
            <QueryVisualization
              query={this.state.query}
              queryResults={this.props.queryResults}
            />
          ) : (
            <VisualizationPlaceholder isLoading={this.props.isQueryLoading} />
          )}
          {this.props.queryError && (
            <Alert type="error">{this.props.queryError.body}</Alert>
          )}
          <QueryActions>
            <RunQuery
              isLoading={this.props.isQueryLoading}
              onClick={() => this.runQuery(this.state.query)}
            >
              {runQueryLabel(this.state.query)}
            </RunQuery>
            <SettingsContainer>
              <QuerySettings
                onDelete={(name) => {
                  this.props.deleteQuery({ name });
                }}
                onSave={(name, refreshRate) => {
                  const body = {
                    query: this.state.query,
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
        <Confirm />
      </div>
    );
  }
}

App.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
