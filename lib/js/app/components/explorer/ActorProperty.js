import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { getThemeForSelect } from '../../utils/style';
import { updateStepUI } from '../../redux/actionCreators/ui';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    schemas: state.collections.schemas,
    steps: state.ui.steps,
  };
};

const mapDispatchToProps = {
  updateStepUI,
};

class ActorProperty extends Component {
  render() {
    const {
      step,
      // ui state
      steps,
      schemas,

      updateStepUI,
    } = this.props;
    const { actorProperty } = this.props.steps[step];
    const { eventCollection } = steps[step];
    const schema = schemas[eventCollection] || {};

    return (
      <Fragment>
        <div className='label'>Actor property</div>
        <Select
          value={{
            label: actorProperty,
            value: actorProperty,
          }}
          options={
            Object.keys(schema).map(item => ({ label: item, value: item }))
          }
          onChange={
            (selectedItem) => {
              updateStepUI({
                step,
                payload: {
                  actorProperty: selectedItem.value,
                },
            });
          }}
          theme={getThemeForSelect}
        />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActorProperty);
