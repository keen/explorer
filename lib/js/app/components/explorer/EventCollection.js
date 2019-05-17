import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import {
  changeEventCollection,
} from '../../redux/actionCreators/ui';

import {
  fetchSchema,
} from '../../redux/actionCreators/client';

const mapStateToProps = state => (
  {
    collections: state.collections,
    eventCollection: state.ui.eventCollection,
  }
);

const mapDispatchToProps = {
  fetchSchema,
  changeEventCollection,
};

class EventCollection extends Component {
  render() {
    const {
      collections,
      eventCollection,

      fetchSchema,
      changeEventCollection,
    } = this.props;

    return (
      <div className='event-collection'>
        <div className='label'>Event collection</div>
          <Select
            value={{
              label: eventCollection,
              value: eventCollection,
            }}
            options={collections.items.map(item => ({ label: item.name, value: item.url }))}
            onChange={(e) => {
              fetchSchema({
                collection: e.label,
              });
              changeEventCollection({
                eventCollection: e.label,
              });
            }}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventCollection);
