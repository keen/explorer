import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';

import SelectTargetProperty from './explorer/SelectTargetProperty';

import { fetchProject, query } from '../redux/actionCreators/client';
import { updateUI } from '../redux/actionCreators/ui';

import { Dataviz } from './explorer/Dataviz';
import { Timeframe } from './explorer/Timeframe';

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
      timeframe
    } = this.props.ui;

    return (
      <div id='keen-explorer' >
        <div className='label'>Analysis Type</div>
        <Select
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
          updateTimeframe={ (timeframe) => this.props.updateUI({
            timeframe
          }) }
        />

        <button onClick={() => this.props.query({
          analysis_type: analysisType,
          event_collection: eventCollection,
          target_property: targetProperty,
          timeframe
        }) } >RUN</button>

        <Dataviz queries={this.props.queries}/>
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
