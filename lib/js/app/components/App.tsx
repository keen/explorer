// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPubSub } from '@keen.io/pubsub';

import {
  runQuery,
  deleteQuery,
  saveQuery,
  resetQueryResults,
  fetchSavedQueries,
  getQueryResults,
} from '../modules/queries';
import {
  getSavedQuery,
  resetSavedQuery,
  selectSavedQuery,
} from '../modules/savedQuery';
import {
  loadPersitedState,
  getViewMode,
  getVisualizationType,
  createNewQuery,
  editQuery,
} from '../modules/app';

import { AppState } from '../modules/types';

import Browser from './Browser';
import Editor from './Editor';
import QuerySettingsModal from './QuerySettingsModal';
import ToastNotifications from './ToastNotifications';
import Confirm from './Confirm';

import { NEW_QUERY_EVENT, CACHE_AVAILABLE } from '../constants';

const mapStateToProps = (state: AppState) => ({
  savedQuery: getSavedQuery(state),
  widget: getVisualizationType(state),
  view: getViewMode(state),
  queryResults: getQueryResults(state),
});

const mapDispatchToProps = {
  saveQuery,
  editQuery,
  fetchSavedQueries,
  resetQueryResults,
  deleteQuery,
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
    this.props.fetchSavedQueries();
    this.props.loadPersitedState();
  }

  onSaveQuery = ({
    displayName,
    refreshRate,
    tags,
    name,
  }: {
    displayName: string;
    refreshRate: number;
    tags: string[];
    name: string;
  }) => {
    const body = {
      query: this.state.query,
      metadata: {
        displayName,
        widget: this.props.widget,
        tags,
      },
      refreshRate: refreshRate * 60 * 60,
    };

    this.props.saveQuery(name, body);
  };

  render() {
    return (
      <div>
        {this.props.view === 'browser' && (
          <Browser
            query={this.state.query}
            queryResults={this.props.queryResults}
            onRunQuery={() => this.props.runQuery(this.state.query)}
            onSelectQuery={(queryName, query) => {
              this.props.selectSavedQuery(queryName);
              this.props.resetQueryResults();
              this.setState({ query });
            }}
            onEditQuery={(queryName) => {
              this.props.editQuery(queryName);
            }}
          />
        )}
        {this.props.view === 'editor' && (
          <div>
            <Editor
              query={this.state.query}
              upgradeSubscriptionUrl={this.props.upgradeSubscriptionUrl}
              onRunQuery={() => this.props.runQuery(this.state.query)}
              onSaveQuery={() => {
                const {
                  displayName,
                  name,
                  tags,
                  refreshRate,
                } = this.props.savedQuery;
                this.onSaveQuery({
                  displayName,
                  refreshRate,
                  tags,
                  name,
                });
              }}
              onUpdateQuery={(query) => {
                console.log(query, '--- query update');
                this.setState({ query });
              }}
            />
          </div>
        )}
        <Confirm />
        <ToastNotifications />
        <QuerySettingsModal
          cacheAvailable={CACHE_AVAILABLE.includes(
            this.state.query.analysis_type
          )}
          onSaveQuery={(settings) => this.onSaveQuery(settings)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
