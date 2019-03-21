import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import SelectTargetProperty from './explorer/SelectTargetProperty';

import { fetchProject, fetchSchema, query } from '../redux/actionCreators/client';
import { updateUI } from '../redux/actionCreators/ui';

import { Dataviz } from './explorer/Dataviz';
import { Foldable } from './explorer/Foldable';
import { Timeframe } from './explorer/Timeframe';
import { Interval } from './explorer/Interval';
import { Filters } from './explorer/Filters';
import GroupBy from './explorer/GroupBy';

import { getChartTypeOptions } from '../utils/ChartTypes';
import { b64EncodeUnicode, b64DecodeUnicode } from '../utils/base64';
import { updateURLParameter } from '../utils/url';

import { ANALYSIS_TYPES, RELATIVITY_UNITS, TIME_UNITS, TIMEFRAME_TABS } from './consts';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    collections: state.collections,
    queries: state.queries,
    ui: state.ui
  }
};

const mapDispatchToProps = {
  fetchProject,
  fetchSchema,
  query,
  updateUI
};

class App extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    this.props.fetchProject();
    Modal.setAppElement(this.props.container);

    const url = new URL(window.location.href);
    const search_params = new URLSearchParams(url.search);
    if (search_params) {
      const UIencodedState = search_params.get('state');
      if (UIencodedState) {
        const preloadState = JSON.parse(b64DecodeUnicode(UIencodedState));
        preloadState.autoload = true;
        this.props.updateUI(preloadState);
      }
    }

  }

  componentDidUpdate(prevProps) {
    const { ui } = this.props;
    const UIencodedState = b64EncodeUnicode(JSON.stringify(ui));
    const url = new URL(window.location.href);
    const query_string = url.search;
    const search_params = new URLSearchParams(query_string);
    const UIencodedStateOld = search_params.get('state');
    if (UIencodedState !== UIencodedStateOld) {
      search_params.set('state', UIencodedState);
      url.search = search_params.toString();
      history.pushState({}, "", url.toString());
    }

    const {
      eventCollection,
      autoload
    } = this.props.ui;

    if (prevProps.collections.items.length !== this.props.collections.items.length
      && !Object.keys(this.props.collections.schema).length
    ) {
      this.props.fetchSchema({
        collection: eventCollection
      });
    }

    if (autoload) {
      ui.autoload = false;
      updateUI({
        autoload: false
      });
      this.runQuery();
    }
  }

  getQueryParams() {
    const {
      analysisType,
      eventCollection,
      targetProperty,
      timeframe,
      filters,
      interval,
      groupBy,
      orderBy,
      limit,
    } = this.props.ui;

    const queryParams = {
      analysisType,
      eventCollection,
      timeframe,
      ...{
        interval,
        targetProperty,
        filters,
        groupBy,
        orderBy,
        limit,
      }
    };

    return queryParams;
  }

  runQuery() {
    this.props.query(this.getQueryParams());
  }

  render() {
    const {
      collections,
      queries,
      updateUI,
      fetchSchema,
      query
    } = this.props;
    const {
      analysisType,
      eventCollection,
      showTargetProperty,
      targetProperty,
      timeframe,
      timeframeData,
      filters,
      interval,
      groupBy,
      orderBy,
      limit,
      chartType
    } = this.props.ui;
    const selectedAnalysisType = {
      label: analysisType,
      value: analysisType
    };
    const selectedEventCollection = {
      label: eventCollection,
      value: eventCollection
    };
    const selectedTargetProperty = {
      label: targetProperty,
      value: targetProperty
    };

    const chartTypes = getChartTypeOptions(this.getQueryParams());
    const hasResults = queries && queries.results;

    let chartTypeSelected = chartTypes.length && { label: chartTypes[0], value: chartTypes[0] };
    if (chartType){
      chartTypeSelected = { label: chartType, value: chartType };
    }

    return (
      <div className='keenExplorer' >

        <div className='panel'>

        <div className='label'>Analysis Type</div>
        <Select
          value={ selectedAnalysisType }
          options={ ANALYSIS_TYPES.map(item => ({ label: item.type, value: item.type }) ) }
          onChange={ (e) => {
            updateUI({
              analysisType: e.value,
              showTargetProperty:
                !!ANALYSIS_TYPES.find(item => item.type === e.label).targetProperty
            });
          }}
          />
        <div className='label'>Event Collection</div>
        <Select
          value = { selectedEventCollection }
          options={ collections.items.map(item => ({ label: item.name, value: item.url }) ) }
          onChange={ (e) => {
            updateUI({
              eventCollection: e.label,
              targetProperty: undefined
            });
            fetchSchema({
              collection: e.label
            });
          }}
        />

        { showTargetProperty && eventCollection &&
          <SelectTargetProperty
            value={ selectedTargetProperty }
            eventCollection={ eventCollection }
          />
        }

        <Timeframe
          value={ timeframeData }
          onChange={ (timeframe) => updateUI({
            timeframe
          }) }
        />

        <div
          onClick={() => this.openModal()}
          className='filters'
          >
          <div className='label'>Filters</div>
        </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={() => this.closeModal()}
            contentLabel="Example Modal"
           >
            <button onClick={() => this.closeModal()}>close</button>
            <Filters />
          </Modal>

        <Foldable
          title='Group By - Order By'
          defaultActive={ !!groupBy }
          onClose={
            () => {
              updateUI({
                groupBy: undefined,
                orderBy: undefined,
                limit: undefined,
                numberOfGroupByProps: 1
              });
            }
          }>
          <GroupBy />
        </Foldable>

        <Foldable
          title='Interval'
          defaultActive={ !!interval }
          onClose={
            () => {
              updateUI({
                interval: undefined
              });
            }
          }>
          <Interval
            onChange={ (interval) => updateUI({
              interval
            }) }
          />
        </Foldable>

        </div>

        <div className='result'>
          { !hasResults &&
          <div className='letsGo'>
            Let's go exploring!
          </div>
          }


          { hasResults &&
            <Fragment>
            <Dataviz />
            <Select
              value={ chartTypeSelected }
              options={ chartTypes.map(item => ({ label: item, value: item }) ) }
              onChange={ (e) => {
                updateUI({
                  chartType: e.value
                });
              }}
              className='chartType'
              />
             </Fragment>
           }

          <button onClick={() => this.runQuery() } >Run Query</button>
        </div>

      </div>
    );
  }

}

App.propTypes = {
  todoText: PropTypes.string,
  //increment: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
