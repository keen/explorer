// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import snakeCase from 'snakecase-keys';
import { Alert } from '@keen.io/ui-core';
import { getPubSub } from '@keen.io/pubsub';

import { fetchProject, fetchSchema } from '../redux/actionCreators/client';

import {
  runQuery,
  deleteQuery,
  saveQuery,
  resetQueryResults,
  getError,
  fetchSavedQueries,
  getQueryResults,
  getQueryPerformState,
} from '../modules/queries';
import { resetSavedQuery, selectSavedQuery } from '../modules/savedQuery';
import {
  loadPersitedState,
  getViewMode,
  getVisualizationType,
  createNewQuery,
  copyShareUrl,
  editQuery,
} from '../modules/app';

import APIQueryURL from './explorer/APIQueryURL';

import Browser from './Browser';
import Creator from './Creator';
import QuerySettings from './QuerySettings';
import QueryVisualization from './QueryVisualization';
import VisualizationPlaceholder from './VisualizationPlaceholder';
import ShareQuery from './ShareQuery';
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
  view: getViewMode(state),
  isQueryLoading: getQueryPerformState(state),
  queryResults: getQueryResults(state),
  queryError: getError(state),
  widget: getVisualizationType(state),
});

const mapDispatchToProps = {
  fetchProject,
  fetchSchema,
  saveQuery,
  editQuery,
  fetchSavedQueries,
  resetQueryResults,
  deleteQuery,
  loadPersitedState,
  resetSavedQuery,
  selectSavedQuery,
  createNewQuery,
  copyShareUrl,
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
          this.props.createNewQuery();
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
    console.log('---', this.state.query);

    return (
      <div>
        {this.props.view === 'browser' && (
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
              this.props.editQuery(queryName);
            }}
          />
        )}
        {this.props.view === 'editor' && (
          <div>
            <div>
              <Creator
                onUpdateQuery={(query) => {
                  console.log(query, '--- query update');
                  this.setState({ query });
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
                <ShareQuery
                  onShareQuery={() =>
                    this.props.copyShareUrl(
                      this.state.query,
                      this.props.savedQuery
                    )
                  }
                />
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
