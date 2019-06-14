import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import {
  updateSavedQueries,
  resetResults,
} from '../../redux/actionCreators/queries';

import {
  updateUI,
} from '../../redux/actionCreators/ui';

import {
  fetchSavedQueries,
  deleteQuery,
} from '../../redux/actionCreators/client';

import { getPropertyType } from '../../utils/filter';

const mapStateToProps = state => ({
  savedQueries: state.queries.saved,
  savedQuery: state.ui.savedQuery,
  timezone: state.ui.timezone,
  schemas: state.collections.schemas,
});

const mapDispatchToProps = {
  updateSavedQueries,
  updateUI,
  fetchSavedQueries,
  resetResults,
  deleteQuery,
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

  getTypeAndValue({
    filter,
    eventCollection,
  }){
    let {
      property_name: propertyName,
      operator,
      property_value: propertyValue,
    } = filter;
    const {
      schemas
    } = this.props;

    const schemasFromProps = (schemas && Object.keys(schemas).length && schemas) || {};
    const schema =  schemasFromProps && schemasFromProps[eventCollection];

    const propertyType = getPropertyType({
      schema,
      filter: {
        propertyName,
        operator,
        propertyValue,
      },
    });

    return {
      propertyValue,
      propertyType,
    };
  }

  confirmDeleteQuery({ e, query_name }) {
    e.stopPropagation();
    if (confirm(`Delete query "${query_name}"?`)) {
      this.props.deleteQuery({
        name: query_name,
      });
    }
  }

  render() {
    const {
      savedQueries,
      savedQuery,

      // dispatchers
      updateUI,
      resetResults,
    } = this.props;

    const translateDeprecatedCharts = (chartType) => {
      const map = {
        areachart: 'area',
        barchart: 'horizontal-bar',
        columnchart: 'bar',
        linechart: 'line',
        piechart: 'pie',
      };
      return map[chartType] || chartType || 'JSON';
    };

    const activeSavedQuery = savedQuery && savedQuery.name;

    const {
      filter,
      error,
    } = this.state;

    return (
      <div className='saved-queries'>
        { error && <div className='error'>{error}</div>}
        <input
          className='input-filter'
          placeholder='Search...'
          type='text'
          value={filter}
          onChange={(e) => this.updateFilter(e)}
        />
        { savedQueries
          .filter(item => this.getName(item).toLowerCase().indexOf(filter.toLowerCase()) >= 0)
          .sort((itemA, itemB) => {
            const a = this.getName(itemA);
            const b = this.getName(itemB);
            if (a.toLowerCase() < b.toLowerCase()) { return -1; }
            if (a.toLowerCase() > b.toLowerCase()) { return 1; }
            return 0;
          })
          .map(item =>
          <div
            key={item.query_name}
            className={
              `item ${activeSavedQuery === item.query_name && 'active'}`
            }
          onClick={() => {
            const { query, metadata } = item;
            let stepLabels = [''];
            if (query.analysis_type === 'funnel') {
              stepLabels = metadata.visualization.step_labels || [''];
            }
            const chartType = translateDeprecatedCharts(metadata.visualization.chart_type);
            resetResults();

            if (query.analysis_type === 'multi_analysis') {
              updateUI({
                error: {
                  body: 'Multi-Analysis is not supported by the Explorer',
                },
              });
              return;
            }

            updateUI({
              panelSave: true,
              autoload: true,
              analysisType: query.analysis_type,
              eventCollection: query.event_collection,
              timezone: query.timezone,
              targetProperty: query.target_property,
              timeframe: query.timeframe,
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
                  ...this.getTypeAndValue({
                    filter: item,
                    eventCollection: query.event_collection,
                  }),
                };
              }),
              chartType,
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
                  filters: (item.filters || []).map(filteritem => {
                    return {
                      propertyName: filteritem.property_name,
                      operator: filteritem.operator,
                      ...this.getTypeAndValue({
                        filter: filteritem,
                        eventCollection: query.event_collection,
                      }),
                    };
                  }),
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
          {
            moment(item.last_modified_date).format('MMMM Do YYYY, h:mm:ss a')
          }
        </div>
        <i
          onClick={(e) => this.confirmDeleteQuery({
            e,
            query_name: item.query_name,
          })}
          className='fas fa-times button-delete' />
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
