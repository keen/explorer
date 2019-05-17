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
    } = this.props;

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
            value={''}
            onChange={(e) => {
              updateUI({
                
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
