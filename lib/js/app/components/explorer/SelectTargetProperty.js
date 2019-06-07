import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ReactSelect from './shared/ReactSelect';

import { getThemeForSelect } from '../../utils/style';
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
        <div className='label-main'>Target property</div>
        <ReactSelect
          value={this.props.value}
          options={
            Object.keys(schema).map(item => ({ label: item, value: item }) )
          }
          onChange={
            (value) => {
              updateUI({ targetProperty: value.value });
            }
          }
          theme={getThemeForSelect}
        />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectTargetProperty);
