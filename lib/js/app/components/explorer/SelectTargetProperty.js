import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    schemas: state.collections.schemas,
    eventCollection: state.ui.eventCollection,
  };
};

const mapDispatchToProps = {
  updateUI,
};

class SelectTargetProperty extends Component {
  render() {
    const {
      schemas,
      eventCollection,

      updateUI,
    } = this.props;

    const schema = schemas[eventCollection] || {};

    return (
      <Fragment>
        <div className='label'>Target property</div>
        <Select
          value={this.props.value}
          options={
            Object.keys(schema).map(item => ({ label: item, value: item }) )
          }
          onChange={
            (value) => {
              updateUI({ targetProperty: value.value });
            }
          }
        />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectTargetProperty);
