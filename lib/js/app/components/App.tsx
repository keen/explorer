// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import snakeCase from 'snakecase-keys';
import { Alert } from '@keen.io/ui-core';
import { getPubSub } from '@keen.io/pubsub';

import { fetchProject, fetchSchema } from '../redux/actionCreators/client';

import {
  createNewQuery,
  runQuery,
  deleteQuery,
  saveQuery,
  resetQueryResults,
  getError,
  fetchSavedQueries,
  getQueryResults,
  getQueryPerformState,
} from '../modules/queries';
import {
  resetSavedQuery,
  editSavedQuery,
  selectSavedQuery,
} from '../modules/savedQuery';
import {
  persistState,
  loadPersitedState,
  getVisualizationType,
} from '../modules/app';

import QueryCreator, {
  NEW_QUERY_EVENT as CREATOR_NEW_QUERY_EVENT,
} from '../queryCreator';

import APIQueryURL from './explorer/APIQueryURL';

import Browser from './Browser';
import QuerySettings from './QuerySettings';
import QueryVisualization from './QueryVisualization';
import VisualizationPlaceholder from './VisualizationPlaceholder';
import RunQuery, { runQueryLabel } from './RunQuery';
import Confirm from './Confirm';

import { QueryActions, SettingsContainer } from './App.styles';

import { NEW_QUERY_EVENT, CACHE_AVAILABLE } from '../consts';

import { client } from '../KeenExplorer';

const mapStateToProps = (state, props) => ({
  collections: state.collections,
  queries: state.queries,
  eventCollection: state.ui.eventCollection,
  savedQuery: state.savedQuery,
  isQueryLoading: getQueryPerformState(state),
  queryResults: getQueryResults(state),
  queryError: getError(state),
  widget: getVisualizationType(state),
});

const mapDispatchToProps = {
  fetchProject,
  fetchSchema,
  saveQuery,
  editSavedQuery,
  fetchSavedQueries,
  resetQueryResults,
  deleteQuery,
  persistState,
  loadPersitedState,
  resetSavedQuery,
  selectSavedQuery,
  createNewQuery,
  runQuery,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {},
      mode: 'browser',
    };

    const pubsub = getPubSub();
    this.subscriptionDispose = pubsub.subscribe((eventName: string) => {
      switch (eventName) {
        case NEW_QUERY_EVENT:
          this.setState({ mode: 'editor' }, () => {
            pubsub.publish(CREATOR_NEW_QUERY_EVENT);
            this.props.resetQueryResults();
            this.props.resetSavedQuery();
          });
          break;
        default:
          break;
      }
    });
  }

  componentWillUnmount() {
    if (this.subscriptionDispose) this.subscriptionDispose();
  }

  componentDidMount() {
    this.props.fetchProject();
    this.props.fetchSavedQueries();
    this.props.loadPersitedState();
  }

  render() {
    const {
      config: { projectId, readKey, masterKey },
    } = this.props.keenAnalysis;

    console.log('---', this.state.query);

    return (
      <div>
        {this.state.mode === 'browser' && (
          <Browser
            query={this.state.query}
            queryResults={this.props.queryResults}
            onRunQuery={() => this.props.runQuery(this.state.query)}
            onSelectQuery={(queryName, { query }) => {
              this.props.selectSavedQuery(queryName);
              this.props.resetQueryResults();
              this.setState({ query: snakeCase(query) });
            }}
            onEditQuery={(queryName) => {
              this.setState({ mode: 'editor' }, () => {
                this.props.editSavedQuery(queryName);
              });
            }}
          />
        )}
        {this.state.mode === 'editor' && (
          <div>
            <div>
              <QueryCreator
                projectId={projectId}
                readKey={readKey}
                masterKey={masterKey}
                onUpdateQuery={(query) => {
                  console.log(query, '--- query update');
                  this.setState({ query });
                  this.props.persistState({ query });
                }}
              />
              <APIQueryURL queryParams={this.state.query} client={client} />
            </div>

            <div className="result">
              {this.props.queryResults ? (
                <QueryVisualization
                  query={this.state.query}
                  queryResults={this.props.queryResults}
                />
              ) : (
                <VisualizationPlaceholder
                  isLoading={this.props.isQueryLoading}
                />
              )}
              {this.props.queryError && (
                <Alert type="error">{this.props.queryError.body}</Alert>
              )}
              <QueryActions>
                <RunQuery
                  isLoading={this.props.isQueryLoading}
                  onClick={() => this.props.runQuery(this.state.query)}
                >
                  {runQueryLabel(this.state.query)}
                </RunQuery>
                <SettingsContainer>
                  <QuerySettings
                    cacheAvailable={CACHE_AVAILABLE.includes(
                      this.state.query.analysis_type
                    )}
                    onDelete={(queryName) => this.props.deleteQuery(queryName)}
                    onSave={(name, refreshRate) => {
                      const body = {
                        query: this.state.query,
                        metadata: {
                          displayName: name,
                          widget: this.props.widget,
                        },
                        refreshRate: refreshRate * 60 * 60,
                      };

                      this.props.saveQuery(name, body);
                    }}
                  />
                </SettingsContainer>
              </QueryActions>
            </div>
          </div>
        )}
        <Confirm />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
