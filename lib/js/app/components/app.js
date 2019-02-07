import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import KeenDataviz from 'keen-dataviz';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    collections: state.collections
  }
}

const fetchProject = () => ({
  type: 'PROJECT_FETCH'
})

const query = (payload) => ({
  type: 'CLIENT_RUN_QUERY',
  payload
})

const ANALYSIS_TYPES = [
  { type: 'sum', target_property: true },
  { type: 'count' },
  { type: 'count_unique', target_property: true },
  { type: 'minimum', target_property: true },
  { type: 'maximum', target_property: true },
  { type: 'average', target_property: true },
  { type: 'select_unique', target_property: true },
  { type: 'extraction', extraction: true },
  { type: 'percentile', target_property: true, percentile: true },
  { type: 'standard_deviation', target_property: true },
  { type: 'median', target_property: true },
  { type: 'funnel', funnel: true }
];

const mapDispatchToProps = { fetchProject, query }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        timeframe: 'this_7_days'
      }
    };
  }

  componentDidMount(){
    this.props.fetchProject();
  }

  render() {
    const { collections } = this.props;
console.log(this.state);
    console.log(this.props);
    return (
      <div id="keen-explorer" >

<div>Analysis Type (required)</div>
<Select
  options={ ANALYSIS_TYPES.map(item => ({ label: item.type, value: item.type }) ) }
  onChange={ (e) => this.setState({ query: { ...this.state.query, analysis_type: e.value } })}
  />

<div>Event Collection (required)</div>
<Select
  options={ collections.items.map(item => ({ label: item.name, value: item.url }) ) }
  onChange={ (e) => this.setState({ query: { ...this.state.query, event_collection: e.label } })}
   />

<button onClick={() => this.props.query(this.state.query) } >RUN</button>


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
