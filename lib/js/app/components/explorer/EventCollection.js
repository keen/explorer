import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import {
  changeEventCollection,
  updateUI,
} from '../../redux/actionCreators/ui';

import {
  fetchSchema,
} from '../../redux/actionCreators/client';

const mapStateToProps = state => (
  {
    collections: state.collections,
    eventCollection: state.ui.eventCollection,
    steps: state.ui.steps,
  }
);

const mapDispatchToProps = {
  fetchSchema,
  changeEventCollection,
  updateUI,
};

class EventCollection extends Component {
  render() {
    const {
      funnel,
      step,

      collections,
      steps,

      fetchSchema,
      changeEventCollection,
      updateUI,
    } = this.props;

    let {
      eventCollection,
    } = this.props;

    if (funnel) {
      eventCollection = steps[step].eventCollection;
    }

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
              if (!funnel) {
                fetchSchema({
                  collection: e.label,
                });
                changeEventCollection({
                  eventCollection: e.label,
                });
                return;
              }

              // funnel step
              fetchSchema({
                collection: e.label,
                step,
                funnel,
              });
              updateUI({
                steps: steps.map((item, itemIndex) => {
                  if (itemIndex === step) {
                    item.eventCollection = e.label;
                    item.actorProperty = undefined;
                    item.filters = undefined;
                  }
                  return item;
                }),
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
