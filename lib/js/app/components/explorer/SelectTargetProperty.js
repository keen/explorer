import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ReactSelect from './shared/ReactSelect';

import { getThemeForSelect } from '../../utils/style';
import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = state => ({
  schemas: state.collections.schemas,
  eventCollection: state.ui.eventCollection,
});

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

    const sortedSchemaProps = Object.keys(schema)
      .sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) { return -1; }
        if (a.toLowerCase() > b.toLowerCase()) { return 1; }
        return 0;
      })
      .map(item => ({ label: item, value: item }));

    return (
      <Fragment>
        <div className='label-main'>Target property</div>
        <ReactSelect
          value={this.props.value}
          options={sortedSchemaProps}
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
