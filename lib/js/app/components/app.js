import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';

import SelectTargetProperty from './explorer/SelectTargetProperty';

import { fetchProject, query } from '../redux/actionCreators/client';
import { updateUI } from '../redux/actionCreators/ui';

import { Dataviz } from './explorer/Dataviz';
import { Timeframe } from './explorer/Timeframe';
import { Interval } from './explorer/Interval';
import GroupBy from './explorer/GroupBy';
import { Foldable } from './explorer/Foldable';

import { ANALYSIS_TYPES, RELATIVITY_UNITS, TIME_UNITS, TIMEFRAME_TABS } from './consts';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    collections: state.collections,
    queries: state.queries,
    ui: state.ui
  }
};

const mapDispatchToProps = { fetchProject, query, updateUI };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCollection: null,
      query: {
        timeframe: 'this_67_days'
      }
    };
  }

  componentDidMount(){
    this.props.fetchProject();
  }

  render() {
    const { collections } = this.props;
    const {
      analysisType,
      eventCollection,
      showTargetProperty,
      targetProperty,
      timeframe,
      interval,
      groupBy
    } = this.props.ui;
    const selectedAnalysisType = {
      label: analysisType,
      value: analysisType
    };

    return (
      <div className='keenExplorer' >

        <div className='panel'>

        <div className='label'>Analysis Type</div>
        <Select
          value={ selectedAnalysisType }
          options={ ANALYSIS_TYPES.map(item => ({ label: item.type, value: item.type }) ) }
          onChange={ (e) => {
            this.props.updateUI({
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
            this.props.updateUI({
              eventCollection: e.label
            });
          }}
        />

        { showTargetProperty && eventCollection &&
          <SelectTargetProperty
            eventCollection={eventCollection}
          />
        }

        <Timeframe
          onChange={ (timeframe) => this.props.updateUI({
            timeframe
          }) }
        />

        <Foldable
          title='Group By'
          onClose={
            () => {
              this.props.updateUI({
                groupBy: undefined
              });
            }
          }>
          <GroupBy
            onChange={ (groupBy) => {
              this.props.updateUI({
                groupBy
              });
            }}
          />
        </Foldable>

        <Foldable
          title='Interval'
          onClose={
            () => {
              this.props.updateUI({
                interval: undefined
              });
            }
          }>
          <Interval
            onChange={ (interval) => this.props.updateUI({
              interval
            }) }
          />
        </Foldable>

        <button onClick={() => this.props.query({
          analysis_type: analysisType,
          event_collection: eventCollection,
          target_property: targetProperty,
          group_by: groupBy,
          interval,
          timeframe
        }) } >RUN</button>

        </div>

        <div className='result'>
          <Dataviz queries={this.props.queries}/>
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
