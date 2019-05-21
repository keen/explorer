import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { updateUI } from '../../redux/actionCreators/ui';
import { fetchSchema } from '../../redux/actionCreators/client';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    collections: state.collections,
    steps: state.ui.steps,
  };
};

const mapDispatchToProps = {
  updateUI,
  fetchSchema,
};

class ActorProperty extends Component {
  componentDidUpdate() {
    const {
      step,
      // ui state
      steps,
      collections,

      fetchSchema,
    } = this.props;
    const { fetchingSchema } = collections;
    const { actorProperty } = this.props.steps[step];
    const { eventCollection } = steps[step];
    const funnelSchema = collections.funnelSchema[eventCollection];
    if (eventCollection
      && !funnelSchema
      && !fetchingSchema) {
        /*
      fetchSchema({
        step,
        collection: eventCollection,
      });

        */

    }
  }

  render() {
    const {
      step,
      // ui state
      steps,
      collections,

      fetchSchema,
    } = this.props;
    const { fetchingSchema } = collections;
    const { actorProperty } = this.props.steps[step];
    const { eventCollection } = steps[step];
    const funnelSchema = collections.funnelSchema[eventCollection];
    const { schema = {} } = funnelSchema || {};

    return (
      <Fragment>
        <div className='label'>Actor property</div>
        <Select
          value={{
            label: actorProperty,
            value: actorProperty,
          }}
          options={
            Object.keys(schema).map(item => ({ label: item, value: item }) )
          }
          onChange={
            (selectedItem) => {
              this.props.updateUI({ 
                steps: steps.map((item, itemIndex) => {
                  if (itemIndex === step) {
                    item.actorProperty = selectedItem.value;
                  }
                  return item;
                }),
            });
          }}
        />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActorProperty);
