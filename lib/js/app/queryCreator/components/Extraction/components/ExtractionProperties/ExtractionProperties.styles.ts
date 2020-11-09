import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UI_LAYERS } from '@keen.io/ui-core';

export const PropertySettings = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;

  &[draggable='true'] {
    cursor: grabbing;
  }

  &[draggable='false'] {
    cursor: grab;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
`;

export const SortableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipMotion = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: -50%;
  transform: translateX(10px) translateY(-10px);
  z-index: ${UI_LAYERS.tooltip};
`;
