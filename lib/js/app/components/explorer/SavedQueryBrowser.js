import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  updateSavedQueries,
} from '../../redux/actionCreators/queries';

import {
  updateUI,
} from '../../redux/actionCreators/ui';

const mapStateToProps = state => ({
  savedQueries: state.queries.saved,
  activeSavedQuery: state.ui.activeSavedQuery,
});

const mapDispatchToProps = {
  updateSavedQueries,
  updateUI,
};

class SavedQueryBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    this.fetchSavedQueries();
  }

  fetchSavedQueries() {
    const {
      client,
      updateSavedQueries,
    } = this.props;

    client
      .get(client.url('queries', 'saved'))
      .auth(client.masterKey())
      .send()
      .then((res) => {
        updateSavedQueries(res);
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    const {
      savedQueries,
      activeSavedQuery,
      updateUI,
    } = this.props;

    const { error } = this.state;

    return (
      <div className='saved-queries'>
        { error && <div className='error'>{error}</div>}
        { savedQueries.map((item, index) =>
          <div
            key={item.query_name}
            className={
              `item ${activeSavedQuery === index && 'active'}`
            }
          onClick={() => {
            const { query, metadata } = item;
            updateUI({
              autoload: true,
              activeSavedQuery: index,
              analysisType: query.analysis_type,
              eventCollection: query.event_collection,
              timezone: query.timezone,
              targetProperty: query.target_property,
              timeframe: query.timeframe,
              groupBy: query.groupBy,
              interval: query.interval,
              filters: query.filters.map(item => {
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
                refreshRate: item.refresh_rate,
              },
            });
          }}
        >{item.query_name}</div>
      )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedQueryBrowser);
