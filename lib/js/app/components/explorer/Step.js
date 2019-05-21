import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoldableStep from './FoldableStep';

import {
  updateUI,
  deleteStep,
} from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    activeStep: state.ui.activeStep,
    stepLabels: state.ui.stepLabels,
  }
);

const mapDispatchToProps = {
  updateUI,
  deleteStep,
};

class Step extends Component {
  render() {
    const {
      // dispatch on reducers
      updateUI,
      deleteStep,

      // from props
      index,
      children,

      // from UI state
      activeStep,
      stepLabels,
    } = this.props;

    const labelValue = stepLabels && stepLabels[index];

    return (
      <div className={
        `step ${index === activeStep ? 'active-step' : ''}`
      }>
        <FoldableStep
          title={`Step ${index + 1}`}
          defaultActive={index === activeStep}
          onChange={(active) => {
            updateUI({
              activeStep: active ? index : undefined,
            });
          }}
          onClose={
            () => {
              updateUI({
                activeStep: undefined,
              });
            }
          }
          onDelete={() => {
            deleteStep(index);
          }}
        >
        <div className='label first-label'>Label</div>
        <input
            className='input-text'
            placeholder='Eg. Customers this month'
            type='text'
            value={labelValue}
            onChange={(e) => {
              updateUI({
                stepLabels: stepLabels.map((item, itemIndex) => {
                  if (itemIndex === index) {
                    return e.target.value;
                  }
                  return item;
                })
              });
            }}
          />
        {children}
        </FoldableStep>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step);
