import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';

import {
  updateUI,
} from '../../redux/actionCreators/ui';

import {
  fetchSchema,
  fetchRecentEvents,
} from '../../redux/actionCreators/client';

import FilteredList from './shared/FilteredList';
import LoadingSpinner from './shared/LoadingSpinner';

const mapStateToProps = state => ({
  collectionItems: state.collections.items,
  schemas: state.collections.schemas,
  recentEvents: state.collections.recentEvents,
  eventCollection: state.ui.eventCollection,
  fetchingSchema: state.collections.fetchingSchema,
  fetchingRecentEvents: state.collections.fetchingRecentEvents,
});

const mapDispatchToProps = {
  updateUI,
  fetchSchema,
  fetchRecentEvents,
};

const TAB_EVENTS = 0;
const TAB_SCHEMA = 1;
class PreviewCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: TAB_SCHEMA,
    };
  }

  componentDidMount() {
    const { eventCollection } = this.props;
    if (eventCollection) {
      fetchSchema({
        eventCollection,
      });
    }
  }

  render() {
    const {
      eventCollection,
      collectionItems,
      schemas,
      recentEvents,
      fetchingSchema,
      fetchingRecentEvents,

      fetchSchema,
      updateUI,
      fetchRecentEvents,
    } = this.props;

    const {
      activeTab
    } = this.state;

    const isFetching = (fetchingSchema || fetchingRecentEvents);

    const currentSchema = schemas[eventCollection] || {};

    return (
      <div className='preview-collection-content'>
        <div className='list'>
          <FilteredList
            items={collectionItems}
            activeItem={eventCollection}
            onClick={(name) => {
              updateUI({
                eventCollection: name,
              });
              fetchSchema({
                eventCollection: name,
              });
            }}
          />
        </div>
        <div className='content'>
        <div className='tabs'>
          <div className={`tab ${activeTab === TAB_SCHEMA ? 'active' : '' }`}
            onClick={() => {
              this.setState({
                activeTab: TAB_SCHEMA,
              });
            }}>Schema</div>
          <div className={`tab ${activeTab === TAB_EVENTS ? 'active' : '' }`}
            onClick={() => {
              this.setState({
                activeTab: TAB_EVENTS,
              }, () => {
                fetchRecentEvents({
                  eventCollection,
                })
              });
          }}>Recent Events</div>
            <div className='tab-placeholder' />
          </div>
        <div
          className='tab-content'
        >
          {
            isFetching &&
            <LoadingSpinner />
          }

          { !isFetching && activeTab === TAB_SCHEMA &&
            <ReactJson
              src={currentSchema}
              style={{
                'fontFamily': 'inherit',
              }}
              collapsed={false}
              displayDataTypes={false}
              sortKeys
            /> }

          { !isFetching && activeTab === TAB_EVENTS &&
            <ReactJson
              src={recentEvents}
              style={{
                'fontFamily': 'inherit',
              }}
              collapsed={false}
              displayDataTypes={false}
              sortKeys
            />
          }
        </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreviewCollection);
