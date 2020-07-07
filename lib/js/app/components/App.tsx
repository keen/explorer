// @ts-nocheck
import React, { Component } from 'react';
import camelCase from 'camelcase-keys';
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
  fetchSavedQueries,
  getSavedQueries,
  getQueryResults,
  getQueryPerformState,
} from '../modules/queries';
import { resetSavedQuery, selectSavedQuery } from '../modules/savedQuery';

import QueryCreator from '../queryCreator';
import QueryBrowser from '../queryBrowser';

import { persistState, loadPersitedState } from '../modules/app';

import APIQueryURL from './explorer/APIQueryURL';

import QuerySettings from './QuerySettings';
import QueryVisualization from './QueryVisualization';
import VisualizationPlaceholder from './VisualizationPlaceholder';
import RunQuery, { runQueryLabel } from './RunQuery';
import Confirm from './Confirm';

import { QueryActions, SettingsContainer } from './App.styles';

import { client } from '../KeenExplorer';

const mapStateToProps = (state, props) => ({
  collections: state.collections,
  queries: state.queries,
  savedQueries: camelCase(getSavedQueries(state), { deep: true }),
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
  fetchSavedQueries,
  deleteQuery,
  persistState,
  loadPersitedState,
  resetSavedQuery,
  selectSavedQuery,
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
    this.props.fetchSavedQueries();

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
      //UI components
      components,
    } = this.props;

    return (
      <div>
        <QueryBrowser
          onSelectQuery={(queryName) => {
            this.props.selectSavedQuery(queryName);
          }}
          onDeleteQuery={(queryName) => {
            this.props.deleteQuery({ name: queryName });
          }}
          queries={this.props.savedQueries}
        />
        <div>
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
