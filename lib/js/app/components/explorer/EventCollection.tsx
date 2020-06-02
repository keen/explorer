// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select, { components } from 'react-select';
import { getThemeForSelect } from '../../utils/style';

import {
  changeEventCollection,
  updateStepUI,
} from '../../redux/actionCreators/ui';

import { fetchSchema } from '../../redux/actionCreators/client';

const Input = (props) => (
  <components.Input {...props} autofill="off" name="eventCollection" />
);

const mapStateToProps = (state) => ({
  collections: state.collections,
  eventCollection: state.ui.eventCollection,
  steps: state.ui.steps,
  schemas: state.collections.schemas,
});

const mapDispatchToProps = {
  fetchSchema,
  changeEventCollection,
  updateStepUI,
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
      updateStepUI,
    } = this.props;

    let { eventCollection, saveStateToLocalStorage } = this.props;

    if (funnel) {
      eventCollection = steps[step].eventCollection;
    }

    const hasValue = !!eventCollection;
    const placeholder = !hasValue ? 'Choose an event collection' : undefined;

    const collectionsItems = collections.items;
    const sortedCollectionsItems = collectionsItems
      .sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      .map((item) => ({ label: item.name, value: item.url }));
    const isEventCollectionValid =
      eventCollection &&
      collectionsItems.find((col) => col.name === eventCollection);
    const selectedEventCollection = isEventCollectionValid && {
      label: eventCollection,
      value: eventCollection,
    };

    return (
      <div className="event-collection">
        <div className="label-main">Event collection</div>
        <Select
          name="eventCollection"
          placeholder={placeholder}
          autoFocus={!hasValue}
          value={selectedEventCollection}
          filterOption={({ label }, input) => label.includes(input)}
          components={{
            Input,
          }}
          options={sortedCollectionsItems}
          onChange={(e) => {
            if (saveStateToLocalStorage && localStorage) {
              localStorage.setItem('eventCollection', e.label);
            }
            if (funnel) {
              // funnel step
              fetchSchema({
                eventCollection: e.label,
                step,
                funnel,
              });
              updateStepUI({
                step,
                payload: {
                  eventCollection: e.label,
                  actorProperty: undefined,
                  filters: [],
                },
              });
              return;
            }

            changeEventCollection({
              eventCollection: e.label,
            });
          }}
          theme={getThemeForSelect}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCollection);
