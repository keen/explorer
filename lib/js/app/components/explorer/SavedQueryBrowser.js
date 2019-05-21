import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  updateSavedQueries,
} from '../../redux/actionCreators/queries';

import {
  updateUI,
} from '../../redux/actionCreators/ui';

import {
  fetchSavedQueries,
} from '../../redux/actionCreators/client';

import {
  TAB_TIMEFRAME_RELATIVE,
  TAB_TIMEFRAME_ABSOLUTE,
} from '../consts';

const mapStateToProps = state => ({
  savedQueries: state.queries.saved,
  savedQuery: state.ui.savedQuery,
});

const mapDispatchToProps = {
  updateSavedQueries,
  updateUI,
  fetchSavedQueries,
};

class SavedQueryBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      filter: '',
    };
  }

  componentDidMount() {
    this.props.fetchSavedQueries();
  }

  getName(item) {
    if (item.metadata && item.metadata.display_name) {
      return item.metadata.display_name;
    }
    return item.query_name;
  }

  updateFilter(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  render() {
    const {
      savedQueries,
      updateUI,
      savedQuery,
    } = this.props;

    const activeSavedQuery = savedQuery && savedQuery.name;

    const { filter } = this.state;

    const { error } = this.state;

    return (
      <div className='saved-queries'>
        { error && <div className='error'>{error}</div>}
        <input
          className='input-filter'
          placeholder='Filter...'
          type='text'
          value={filter}
          onChange={(e) => this.updateFilter(e)}
        />
        { savedQueries.filter(item => this.getName(item).toLowerCase().indexOf(filter.toLowerCase()) >= 0).map((item, index) =>
          <div
            key={item.query_name}
            className={
              `item ${activeSavedQuery === item.query_name && 'active'}`
            }
          onClick={() => {
            const { query, metadata } = item;
            let timeframeActiveTab = TAB_TIMEFRAME_RELATIVE;
            if (typeof query.timeframe !== 'string') {
              timeframeActiveTab = TAB_TIMEFRAME_ABSOLUTE;
            }
            let stepLabels = [''];
            if (query.analysis_type === 'funnel') {
              stepLabels = metadata.visualization.step_labels;
            }
            updateUI({
              autoload: true,
              analysisType: query.analysis_type,
              eventCollection: query.event_collection,
              timezone: query.timezone,
              targetProperty: query.target_property,
              timeframe: query.timeframe,
              timeframeActiveTab,
              groupBy: query.group_by,
              orderBy: query.order_by && query.order_by.direction && {
                property_name: 'result',
                direction: query.order_by.direction,
              },
              interval: query.interval,
              filters: (query.filters || []).map(item => {
                return {
                  propertyName: item.property_name,
                  operator: item.operator,
                  propertyValue: item.property_value,
                  // propertyType: this.detectType(item),
                };
              }),
              chartType: metadata.visualization.chart_type,
              savedQuery: {
                name: item.query_name,
                displayName: metadata.display_name,
                exists: true,
                cache: !!item.refresh_rate,
                refreshRate: item.refresh_rate / 60 / 60,
              },
              steps: (query.steps || []).map(item => {
                return {
                  actorProperty: item.actor_property,
                  eventCollection: item.event_collection,
                  filters: item.filters,
                  inverted: item.inverted,
                  optional: item.optional,
                  timeframe: item.timeframe,
                  timezone: item.timezone,
                  withActors: item.with_actors,
                };
              }),
              stepLabels,
            });
          }}
        >
        <div className='name'>
          {this.getName(item)}
        </div>
        <div className='cached'>
          {!!item.refresh_rate &&
            <span>Cached</span>
          }
        </div>
        <div className='data'>
          {moment(item.last_modified_date).format('MMMM Do YYYY, h:mm:ss a')}
        </div>
        </div>
      )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedQueryBrowser);
