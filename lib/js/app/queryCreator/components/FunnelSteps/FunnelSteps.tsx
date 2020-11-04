import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Sortable from 'sortablejs';
import { useTranslation } from 'react-i18next';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Container, IconWrapper, AddStep } from './FunnelSteps.styles';

import { mutateArray } from '../../utils';

import FunnelStep from '../FunnelStep';
import {
  addFunnelStep,
  setFunnelSteps,
  removeFunnelStep,
  getFunnelSteps,
  changeFunnelStepsOrder,
  cloneFunnelStep,
} from '../../modules/query';
import {
  getChartSettings,
  updateChartSettings,
} from '../../modules/chartSettings';

import { DRAG_ANIMATION_TIME } from './constants';
import { AppContext } from '../../contexts';

const FunnelSteps: FC<{}> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const steps = useSelector(getFunnelSteps);
  const chartSettings = useSelector(getChartSettings);
  const { stepLabels } = chartSettings;

  const { onUpdateChartSettings } = useContext(AppContext);

  const [stepVisible, setStepVisible] = useState(null);
  const [isDragged, setDragMode] = useState(false);

  const sortableRef = useRef(null);

  const stepsRef = useRef(null);
  stepsRef.current = steps;

  const stepsLabelsRef = useRef(null);
  stepsLabelsRef.current = stepLabels;

  useEffect(() => {
    new Sortable(sortableRef.current, {
      animation: DRAG_ANIMATION_TIME,
      filter: '.add-step',
      handle: '.dragBar',
      onStart: () => setDragMode(true),
      onMove: (evt) => !evt.related.className.includes('add-step'),
      onEnd: (evt) => {
        const updatedSteps = mutateArray(
          stepsRef.current,
          evt.oldIndex,
          evt.newIndex
        );
        dispatch(changeFunnelStepsOrder(updatedSteps));
        setDragMode(false);

        if (stepsLabelsRef?.current.length) {
          const updatedStepLabels = mutateArray(
            stepsLabelsRef.current,
            evt.oldIndex,
            evt.newIndex
          );
          dispatch(updateChartSettings({ stepLabels: updatedStepLabels }));
          onUpdateChartSettings({ stepLabels: updatedStepLabels });
        }
      },
    });

    return () => {
      dispatch(setFunnelSteps([]));
    };
  }, []);

  const handleStepLabelChange = useCallback(
    (label: string, idx: number) => {
      const updatedStepLabels = [...stepLabels];
      updatedStepLabels[idx] = label;

      dispatch(updateChartSettings({ stepLabels: updatedStepLabels }));
      onUpdateChartSettings({ stepLabels: updatedStepLabels });
    },
    [stepLabels]
  );

  return (
    <Container ref={sortableRef}>
      {!!steps.length &&
        steps.map(
          (
            {
              id,
              eventCollection,
              timeframe,
              timezone,
              inverted,
              optional,
              actorProperty,
              filters,
            },
            idx
          ) => (
            <FunnelStep
              key={id}
              id={id}
              index={idx}
              timeframe={timeframe}
              timezone={timezone}
              actorProperty={actorProperty}
              eventCollection={eventCollection}
              inverted={inverted}
              optional={optional}
              filters={filters}
              onRemove={() => {
                dispatch(removeFunnelStep(id));

                if (stepsLabelsRef?.current.length) {
                  const updatedStepLabels = [...stepsLabelsRef.current];
                  updatedStepLabels.splice(idx, 1);
                  dispatch(
                    updateChartSettings({ stepLabels: updatedStepLabels })
                  );
                  onUpdateChartSettings({ stepLabels: updatedStepLabels });
                }
              }}
              onLabelChange={(label, idx) => handleStepLabelChange(label, idx)}
              detailsVisible={stepVisible === id}
              isFirstStep={idx === 0}
              isDragged={isDragged}
              stepLabel={stepLabels[idx] || undefined}
              setDetailsVisible={(id) => setStepVisible(id)}
              onClone={(id) => {
                const stepId = uuid();
                dispatch(cloneFunnelStep(id, stepId));
                setStepVisible(stepId);
                if (stepsLabelsRef?.current.length) {
                  const updatedStepLabels = [...stepsLabelsRef.current, null];
                  dispatch(
                    updateChartSettings({ stepLabels: updatedStepLabels })
                  );
                  onUpdateChartSettings({ stepLabels: updatedStepLabels });
                }
              }}
            />
          )
        )}
      <AddStep
        className="add-step"
        data-testid="add-step-button"
        onClick={() => {
          const stepId = uuid();
          dispatch(addFunnelStep(stepId));
          setStepVisible(stepId);
        }}
      >
        <IconWrapper>
          <Icon type="plus" width={13} height={13} fill={colors.green[500]} />
        </IconWrapper>
        {t('query_creator_funnel_steps.add_step')}
      </AddStep>
    </Container>
  );
};

export default FunnelSteps;
