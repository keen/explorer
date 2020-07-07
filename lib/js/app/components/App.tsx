// @ts-nocheck
import React, { Component } from 'react';
import camelCase from 'camelcase-keys';
import { connect } from 'react-redux';
import { Alert } from '@keen.io/ui-core';
import { getPubSub } from '@keen.io/pubsub';

import { fetchProject, fetchSchema } from '../redux/actionCreators/client';

import {
  createNewQuery,
  runQuery,
  deleteQuery,
  saveQuery,
  getError,
  fetchSavedQueries,
  getSavedQueries,
  getQueryResults,
  getQueryPerformState,
} from '../modules/queries';
import { resetSavedQuery, selectSavedQuery } from '../modules/savedQuery';

import QueryCreator, {
  NEW_QUERY_EVENT as CREATOR_NEW_QUERY_EVENT,
} from '../queryCreator';
import QueryBrowser from '../queryBrowser';

import { persistState, loadPersitedState } from '../modules/app';

import APIQueryURL from './explorer/APIQueryURL';

import QuerySettings from './QuerySettings';
import QueryVisualization from './QueryVisualization';
import VisualizationPlaceholder from './VisualizationPlaceholder';
import RunQuery, { runQueryLabel } from './RunQuery';
import Confirm from './Confirm';

import { QueryActions, SettingsContainer } from './App.styles';

import { NEW_QUERY_EVENT } from '../consts';

import { client } from '../KeenExplorer';

const mapStateToProps = (state, props) => ({
  collections: state.collections,
  queries: state.queries,
  savedQueries: camelCase(getSavedQueries(state), { deep: true }),
  eventCollection: state.ui.eventCollection,
  savedQuery: state.savedQuery,
  isQueryLoading: getQueryPerformState(state),
  queryResults: getQueryResults(state),
  queryError: getError(state),
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
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {},
    };

    const pubsub = getPubSub();
    this.subscriptionDispose = pubsub.subscribe((eventName: string) => {
      switch (eventName) {
        case NEW_QUERY_EVENT:
          pubsub.publish(CREATOR_NEW_QUERY_EVENT);
          this.props.resetSavedQuery();
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

    return (
      <div>
        <QueryBrowser
          onSelectQuery={(queryName) => {
            this.props.selectSavedQuery(queryName);
          }}
          onDeleteQuery={(queryName) => {
            this.props.deleteQuery(queryName);
          }}
          queries={this.props.savedQueries}
        />
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
            <VisualizationPlaceholder isLoading={this.props.isQueryLoading} />
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
                onDelete={(name) => {
                  this.props.deleteQuery(name);
                }}
                onSave={(name, refreshRate) => {
                  const body = {
                    query: this.state.query,
                    metadata: {
                      displayName: name,
                    },
                    refreshRate: refreshRate * 60 * 60,
                  };

                  this.props.saveQuery(name, body);
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
