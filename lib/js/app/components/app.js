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
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount(){
    this.props.fetchProject();
    Modal.setAppElement(this.props.container);
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
    const queryParams = {
      analysis_type: analysisType,
      event_collection: eventCollection,
      timeframe,
      ...{
        interval,
        target_property: targetProperty,
        filters,
        group_by: groupBy,
        order_by: orderBy,
        limit,
      }
    };
    const chartTypes = getChartTypeOptions(queryParams);
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
            eventCollection={eventCollection}
          />
        }

        <Timeframe
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

          <button onClick={() => query(queryParams) } >Run Query</button>
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
