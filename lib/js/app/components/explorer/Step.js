import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoldableStep from './FoldableStep';

import {
  updateUI,
  updateStepUI,
  deleteStep,
} from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    activeStep: state.ui.activeStep,
    stepLabels: state.ui.stepLabels,
    steps: state.ui.steps,
    stepLabels: state.ui.stepLabels,
  }
);

const mapDispatchToProps = {
  updateUI,
  updateStepUI,
  deleteStep,
};

class Step extends Component {
  render() {
    const {
      // dispatch on reducers
      updateUI,
      updateStepUI,
      deleteStep,

      // from props
      index,
      children,

      // from UI state
      activeStep,
      stepLabels,
      steps,
    } = this.props;

    const currentStep = steps[index];

    const labelValue = (stepLabels && stepLabels[index]) || currentStep.eventCollection;

    const swapArrayElements = (arr, indexA, indexB) => {
      const temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
      return arr;
    };

    return (
      <div
        className={
          `step ${index === activeStep ? 'active-step' : ''}`
        }
      >
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
          onClickDown={() => {
            if (index === steps.length - 1) return;
            const swappedSteps = swapArrayElements(steps, index, index + 1);
            const swappedStepLabels = swapArrayElements(stepLabels, index, index + 1);
            updateUI({
              steps: swappedSteps,
              stepLabels: swappedStepLabels,
              activeStep: activeStep + 1,
            });
          }}
          onClickUp={() => {
            if (index === 0) return;
            const swappedSteps = swapArrayElements(steps, index, index - 1);
            const swappedStepLabels = swapArrayElements(stepLabels, index, index - 1);
            updateUI({
              steps: swappedSteps,
              stepLabels: swappedStepLabels,
              activeStep: activeStep - 1,
            });
          }}
        >

          {children}

          <div className='label-main first-label'>Label</div>
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
                }),
              });
            }}
          />

          <div className='line-options'>
            <div
              className='line-checkbox'
            >
              <input
                type='checkbox'
                id={`step${index}_optional_step`}
                checked={currentStep.optional}
                onChange={(e) => {
                  const optional = e.target.checked;
                  updateStepUI({
                    step: index,
                    payload: {
                      optional,
                    },
                  });
                }}
              />
              <label htmlFor={`step${index}_optional_step`}>Optional Step</label>
            </div>
            <div
              className='line-checkbox'>
              <input
                type='checkbox'
                id={`step${index}_inverted_step`}
                checked={currentStep.inverted}
                onChange={(e) => {
                  const inverted = e.target.checked;
                  updateStepUI({
                    step: index,
                    payload: {
                      inverted,
                    },
                  });
                }}
              />
              <label htmlFor={`step${index}_inverted_step`}>Inverted Step</label>
            </div>
            <div
              className='line-checkbox'
            >
              <input
                type='checkbox'
                id={`step${index}_with_actors_step`}
                checked={currentStep.withActors}
                onChange={(e) => {
                  const withActors = e.target.checked;
                  updateStepUI({
                    step: index,
                    payload: {
                      withActors,
                    },
                  });
                }}
              />
              <label htmlFor={`step${index}_with_actors_step`}>With Actors</label>
            </div>
          </div>
        </FoldableStep>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step);
