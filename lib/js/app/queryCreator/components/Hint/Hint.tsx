import React, { FC, useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Icon, IconType } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { Tooltip } from '@keen.io/ui-core';

import { Container, TooltipContainer } from './Hint.styles';

import { ARROW_DIRECTION } from './contants';
import { Position } from './types';

type Props = {
  type: IconType;
  message: string | React.ReactNode;
  position?: Position;
  fill?: string;
  height?: number;
  width?: number;
  opacity?: number;
};

const Hint: FC<Props> = ({
  type,
  position = 'top',
  fill = colors.white['500'],
  height = 15,
  width = 15,
  opacity = 1,
  message,
}) => {
  const tooltipRef = useRef(null);

  const [state, setState] = useState({
    visible: false,
    tooltipWidth: 0,
    tooltipHeight: 0,
  });

  const { visible, tooltipWidth, tooltipHeight } = state;

  const tooltipMotion = {
    transition: { duration: 0.3 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    visible &&
      setState((state) => ({
        ...state,
        tooltipWidth: tooltipRef.current.clientWidth,
        tooltipHeight: tooltipRef.current.clientHeight,
      }));
  }, [tooltipRef, visible]);

  return (
    <Container
      onMouseEnter={() =>
        setState((state) => ({
          ...state,
          visible: true,
        }))
      }
      onMouseLeave={() =>
        setState((state) => ({
          ...state,
          visible: false,
        }))
      }
    >
      <AnimatePresence>
        {visible && (
          <TooltipContainer
            ref={tooltipRef}
            position={position}
            height={height}
            width={width}
            tooltipWidth={tooltipWidth}
            tooltipHeight={tooltipHeight}
            {...tooltipMotion}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
          >
            <Tooltip
              mode="dark"
              hasArrow={true}
              arrowDirection={ARROW_DIRECTION[position]}
            >
              {message}
            </Tooltip>
          </TooltipContainer>
        )}
      </AnimatePresence>
      <Icon
        type={type}
        fill={fill}
        height={height}
        width={width}
        opacity={opacity}
      />
    </Container>
  );
};

export default Hint;
