// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPubSub } from '@keen.io/pubsub';

import {
  runQuery,
  deleteQuery,
  saveQuery,
  resetQueryResults,
  getQueryResults,
  getQuerySettings,
  setQuerySettings,
} from '../modules/queries';
import {
  getSavedQuery,
  resetSavedQuery,
  selectSavedQuery,
} from '../modules/savedQuery';
import {
  loadPersitedState,
  getViewMode,
  setViewMode,
  getVisualizationType,
  switchToQueriesList,
  createNewQuery,
  editQuery,
} from '../modules/app';

import { MainContainer } from './App.styles';

import { AppState } from '../modules/types';

import Browser from './Browser';
import Editor from './Editor';
import QuerySettingsModal from './QuerySettingsModal';
import ToastNotifications from './ToastNotifications';
import Confirm from './Confirm';

import {
  NEW_QUERY_EVENT,
  CHANGE_VIEW_EVENT,
  CACHE_AVAILABLE,
} from '../constants';

const mapStateToProps = (state: AppState) => ({
  savedQuery: getSavedQuery(state),
  widget: getVisualizationType(state),
  view: getViewMode(state),
  queryResults: getQueryResults(state),
  query: getQuerySettings(state),
});

const mapDispatchToProps = {
  saveQuery,
  editQuery,
  resetQueryResults,
  deleteQuery,
  loadPersitedState,
  resetSavedQuery,
  selectSavedQuery,
  setQuerySettings,
  switchToQueriesList,
  createNewQuery,
  setViewMode,
  runQuery,
};

class App extends Component {
  constructor(props) {
    super(props);

    const pubsub = getPubSub();
    this.subscriptionDispose = pubsub.subscribe(
      (eventName: string, meta: Record<string, any>) => {
        switch (eventName) {
          case CHANGE_VIEW_EVENT:
            const { view } = meta;
            if (view === 'browser') {
              this.props.switchToQueriesList();
            } else {
              this.props.setViewMode(view);
            }
          case NEW_QUERY_EVENT:
            this.props.createNewQuery();
            break;
          default:
            break;
        }
      }
    );
  }

  componentWillUnmount() {
    if (this.subscriptionDispose) this.subscriptionDispose();
  }

  componentDidMount() {
    this.props.loadPersitedState();
  }

  onSaveQuery = ({
    displayName,
    refreshRate,
    tags,
    stepLabels,
    name,
  }: {
    displayName: string;
    refreshRate: number;
    tags: string[];
    stepLabels: string[];
    name: string;
  }) => {
    const body = {
      query: this.props.query,
      metadata: {
        displayName,
        widget: this.props.widget,
        tags,
        stepLabels,
      },
      refreshRate: refreshRate * 60 * 60,
    };

    this.props.saveQuery(name, body);
  };

  render() {
    return (
      <MainContainer>
        {this.props.view === 'browser' && (
          <Browser
            query={this.props.query}
            queryResults={this.props.queryResults}
            onRunQuery={() => this.props.runQuery(this.props.query)}
            onSelectQuery={(queryName, query) => {
              this.props.selectSavedQuery(queryName);
              this.props.resetQueryResults();
              this.props.setQuerySettings(query);
            }}
            onEditQuery={(queryName) => {
              this.props.editQuery(queryName);
            }}
          />
        )}
        {this.props.view === 'editor' && (
          <Editor
            query={this.props.query}
            upgradeSubscriptionUrl={this.props.upgradeSubscriptionUrl}
            onRunQuery={() => this.props.runQuery(this.props.query)}
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
          />
        )}
        <Confirm />
        <ToastNotifications />
        <QuerySettingsModal
          cacheAvailable={CACHE_AVAILABLE.includes(
            this.props.query.analysis_type
          )}
          onSaveQuery={(settings) => this.onSaveQuery(settings)}
        />
      </MainContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
