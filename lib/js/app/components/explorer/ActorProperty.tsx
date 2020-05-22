// @ts-nocheck
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ReactSelect from './shared/ReactSelect';

import { getThemeForSelect } from '../../utils/style';
import { updateStepUI } from '../../redux/actionCreators/ui';

const mapStateToProps = (state) => ({
  schemas: state.collections.schemas,
  steps: state.ui.steps,
});

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
    const schemaProps = Object.keys(schema);
    const sortedSchemaProps = schemaProps
      .sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      .map((item) => ({ label: item, value: item }));

    return (
      <Fragment>
        <div className="label-main">Actor property</div>
        <ReactSelect
          value={{
            label: actorProperty,
            value: actorProperty,
          }}
          options={sortedSchemaProps}
          onChange={(selectedItem) => {
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

ActorProperty.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      actorProperty: PropTypes.string,
    })
  ).isRequired,
  schemas: PropTypes.shape({}).isRequired,
  updateStepUI: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActorProperty);
