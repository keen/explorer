import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getThemeForSelect } from '../../utils/style';

import {
  changeEventCollection,
  updateUI,
  updateStepUI,
} from '../../redux/actionCreators/ui';

import {
  fetchSchema,
} from '../../redux/actionCreators/client';

const mapStateToProps = state => (
  {
    collections: state.collections,
    eventCollection: state.ui.eventCollection,
    steps: state.ui.steps,
    schemas: state.collections.schemas,
  }
);

const mapDispatchToProps = {
  fetchSchema,
  changeEventCollection,
  updateUI,
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
      updateUI,
      updateStepUI,
    } = this.props;

    let {
      eventCollection,
      saveStateToLocalStorage,
    } = this.props;

    if (funnel) {
      eventCollection = steps[step].eventCollection;
    }

    return (
      <div className='event-collection'>
        <div className='label-main'>Event collection</div>
          <Select
            value={{
              label: eventCollection,
              value: eventCollection,
            }}
            options={collections.items.map(item => ({ label: item.name, value: item.url }))}
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
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventCollection);
