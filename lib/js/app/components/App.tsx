// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPubSub } from '@keen.io/pubsub';

import {
  runQuery,
  deleteQuery,
  saveQuery,
  resetQueryResults,
  getQuerySettings,
  setQuerySettings,
} from '../modules/queries';
import {
  getSavedQuery,
  resetSavedQuery,
  selectSavedQuery,
} from '../modules/savedQuery';
import {
  getViewMode,
  setViewMode,
  getVisualization,
  switchToQueriesList,
  createNewQuery,
  explorerMounted,
  editQuery,
} from '../modules/app';
import { setVisualization } from '../utils';

import { MainContainer } from './App.styles';

import { AppState } from '../modules/types';

import Browser from './Browser';
import Editor from './Editor';
import QuerySettingsModal from './QuerySettingsModal';
import ExtractToEmailModal from './ExtractToEmailModal';
import ToastNotifications from './ToastNotifications';
import Confirm from './Confirm';
import EmbedWidgetModal from './EmbedWidgetModal';

import {
  NEW_QUERY_EVENT,
  CHANGE_VIEW_EVENT,
  CACHE_AVAILABLE,
} from '../constants';

const mapStateToProps = (state: AppState) => ({
  savedQuery: getSavedQuery(state),
  visualization: getVisualization(state),
  view: getViewMode(state),
  query: getQuerySettings(state),
});

const mapDispatchToProps = {
  saveQuery,
  editQuery,
  resetQueryResults,
  deleteQuery,
  explorerMounted,
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
    this.props.explorerMounted();
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
    const visualization = setVisualization(
      this.props.query,
      this.props.visualization
    );
    const body = {
      query: this.props.query,
      metadata: {
        displayName,
        visualization,
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
          <>
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
            <ExtractToEmailModal />
          </>
        )}
        <Confirm />
        <ToastNotifications />
        <QuerySettingsModal
          cacheAvailable={CACHE_AVAILABLE.includes(
            this.props.query.analysis_type
          )}
          onSaveQuery={(settings) => this.onSaveQuery(settings)}
        />
        <EmbedWidgetModal />
      </MainContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
