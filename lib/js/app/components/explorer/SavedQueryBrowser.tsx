// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import {
  updateSavedQueries,
  resetResults,
} from '../../redux/actionCreators/queries';

import { updateUI, updateUISavedQuery } from '../../redux/actionCreators/ui';

import { selectSavedQuery } from '../../modules/savedQuery';

import {
  fetchSavedQueries,
  deleteQuery,
} from '../../redux/actionCreators/client';

const mapStateToProps = (state) => ({
  savedQueries: state.queries.saved,
  savedQuery: state.savedQuery,
  timezone: state.ui.timezone,
  schemas: state.collections.schemas,
});

const mapDispatchToProps = {
  updateSavedQueries,
  updateUI,
  updateUISavedQuery,
  fetchSavedQueries,
  resetResults,
  deleteQuery,
  selectSavedQuery,
};

const getName = (item) => {
  if (item.metadata && item.metadata.display_name) {
    return item.metadata.display_name;
  }
  return item.query_name;
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

  componentDidUpdate(prevProps) {
    const {
      savedQueries,
      savedQuery,

      // dispatchers
      updateUISavedQuery,
    } = this.props;
    if (
      !prevProps.savedQueries.length &&
      savedQueries.length &&
      savedQuery.autoload
    ) {
      const item = savedQueries.find(
        (item) => item.query_name === savedQuery.query_name
      );
      updateUISavedQuery({ item, schemas: this.props.schemas });
    }
  }

  updateFilter(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  render() {
    const {
      features,
      savedQueries,
      savedQuery,

      // dispatchers
      updateUI,
      updateUISavedQuery,
      selectSavedQuery,
      resetResults,
    } = this.props;

    const activeSavedQuery = savedQuery && savedQuery.name;

    const { filter, error } = this.state;

    return (
      <div className="saved-queries">
        {error && <div className="error">{error}</div>}
        <input
          className="input-filter"
          placeholder="Search..."
          type="text"
          value={filter}
          onChange={(e) => this.updateFilter(e)}
        />
        {savedQueries
          .filter(
            (item) =>
              getName(item).toLowerCase().indexOf(filter.toLowerCase()) >= 0
          )
          .sort((itemA, itemB) => {
            const a = getName(itemA);
            const b = getName(itemB);
            if (a.toLowerCase() < b.toLowerCase()) {
              return -1;
            }
            if (a.toLowerCase() > b.toLowerCase()) {
              return 1;
            }
            return 0;
          })
          .map((item) => (
            <div
              key={item.query_name}
              className={`item ${
                activeSavedQuery === item.query_name && 'active'
              }`}
              onClick={() => {
                const { query } = item;
                resetResults();
                if (query.analysis_type === 'multi_analysis') {
                  updateUI({
                    error: {
                      body: 'Multi-Analysis is not supported by the Explorer',
                    },
                  });
                  return;
                }
                selectSavedQuery(item.query_name);
                updateUISavedQuery({ item, schemas: this.props.schemas });
              }}
            >
              <div className="name">{getName(item)}</div>
              <div className="cached">
                {!!item.refresh_rate && <span>Cached</span>}
              </div>
              <div className="data">
                {moment(item.user_last_modified_date).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </div>

              {features && features.save && (
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    this.props.deleteQuery({
                      name: item.query_name,
                    });
                  }}
                  className="fas fa-times button-delete"
                />
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedQueryBrowser);
