import React, { FC, useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { ActionButton } from '@keen.io/ui-core';

import { PropertyItem } from '../../../../PropertyGroup';

import { ValueContainer, MotionPropertyItem } from './Value.styles';

import { MAX_WIDTH } from './constants';

type Props = {
  value: string | number;
  removeHandler: (value: string | number) => void;
};

const Value: FC<Props> = ({ value, removeHandler }) => {
  const [isDeletable, setIsDeletable] = useState(true);
  const [isOverflow, setIsOverflow] = useState(false);
  const container = useRef(null);

  const deleteAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

  useEffect(() => {
    if (container.current && container.current.clientWidth >= MAX_WIDTH)
      setIsOverflow(true);
  }, [container]);

  return (
    <>
      <PropertyItem>
        <ValueContainer
          ref={container}
          whileHover={
            isOverflow
              ? {
                  maxWidth: container.current.scrollWidth,
                  textOverflow: 'clip',
                }
              : {}
          }
          onHoverStart={() => {
            isOverflow && setIsDeletable(false);
          }}
          onHoverEnd={() => {
            isOverflow && setIsDeletable(true);
          }}
        >
          {value}
        </ValueContainer>
      </PropertyItem>
      <AnimatePresence>
        {isDeletable && (
          <MotionPropertyItem {...deleteAnimation}>
            <PropertyItem>
              <ActionButton
                onClick={() => removeHandler(value)}
                action="remove"
                borderRadius="0 4px 4px 0"
                background="transparent"
                backgroundHover={transparentize(0.85, colors.blue['100'])}
              />
            </PropertyItem>
          </MotionPropertyItem>
        )}
      </AnimatePresence>
    </>
  );
};

export default Value;
