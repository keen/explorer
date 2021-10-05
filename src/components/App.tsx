// @ts-nocheck
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import { push } from 'connected-react-router';

import { connect, ConnectedProps } from 'react-redux';
import { getPubSub } from '@keen.io/pubsub';

import { queriesActions, getQuerySettings } from '../modules/queries';
import { savedQueryActions, savedQuerySelectors } from '../modules/savedQuery';

import {
  getViewMode,
  setViewMode,
  getVisualization,
  getQueryAutorun,
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
import UpdateSavedQueryModal from './UpdateSavedQueryModal';

import {
  NEW_QUERY_EVENT,
  CHANGE_VIEW_EVENT,
  CACHE_AVAILABLE,
  ROUTES,
} from '../constants';
import { ExportToCSVModal } from './ExportToCSVModal';

const mapStateToProps = (state: AppState) => ({
  savedQuery: savedQuerySelectors.getSavedQuery(state),
  visualization: getVisualization(state),
  autorunQuery: getQueryAutorun(state),
  view: getViewMode(state),
  query: getQuerySettings(state),
});

const mapDispatchToProps = {
  saveQuery: queriesActions.saveQuery,
  editQuery,
  resetQueryResults: queriesActions.resetQueryResults,
  deleteQuery: queriesActions.deleteQuery,
  explorerMounted,
  resetSavedQuery: savedQueryActions.resetSavedQuery,
  selectSavedQuery: savedQueryActions.selectSavedQuery,
  switchToQueriesList,
  createNewQuery,
  setViewMode,
  runQuery: queriesActions.runQuery,
  push,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class App extends Component<Props> {
  constructor(props: Props) {
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
    name,
  }: {
    displayName: string;
    refreshRate: number;
    tags: string[];
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
      },
      refreshRate: refreshRate * 60 * 60,
    };

    this.props.saveQuery({ name, body });
  };

  render() {
    return (
      <MainContainer>
        <Switch>
          <Route exact path={ROUTES.BROWSER}>
            <Browser
              onRunQuery={() =>
                this.props.runQuery({ query: this.props.query })
              }
              onSelectQuery={(queryName) => {
                this.props.resetQueryResults();
                this.props.selectSavedQuery(queryName, this.props.autorunQuery);
                this.props.push(ROUTES.BROWSER + '?savedQuery=' + queryName);
              }}
              onEditQuery={(queryName) => {
                this.props.editQuery(queryName);
              }}
            />
          </Route>
          <Route path={ROUTES.EDITOR}>
            <>
              <Editor
                query={this.props.query}
                savedQueryName={this.props.savedQuery.displayName}
                upgradeSubscriptionUrl={this.props.upgradeSubscriptionUrl}
                onRunQuery={() =>
                  this.props.runQuery({ query: this.props.query })
                }
              />
              <ExtractToEmailModal />
            </>
          </Route>
        </Switch>
        <Confirm />
        <ToastNotifications />
        <QuerySettingsModal
          cacheAvailable={CACHE_AVAILABLE.includes(
            this.props.query.analysis_type
          )}
          onSaveQuery={(settings) => this.onSaveQuery(settings)}
        />
        <EmbedWidgetModal />
        <UpdateSavedQueryModal />
        <ExportToCSVModal />
      </MainContainer>
    );
  }
}

export default hot(connector(App));
