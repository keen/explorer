import React, { FC, useState, useEffect, useRef, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from '@keen.io/ui-core';

import { Container, Type, Path, Name } from './PropertyTreeItem.styles';
import Portal from '../Portal';

import { AppContext } from '../../contexts';

import { SEPARATOR } from './constants';

type Props = {
  /** Property name */
  propertyName: string;
  /** Property path */
  propertyPath: string;
  /** Property type */
  type: string;
  /** Left padding spacing */
  padding: number;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
};

const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

const PropertyTreeItem: FC<Props> = ({
  padding,
  onClick,
  propertyName,
  type,
  propertyPath,
}) => {
  const { modalContainer } = useContext(AppContext);
  const [isEllipsisActive, setEllipsis] = useState(false);

  const nameRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const element = nameRef.current;
    const contentOverflow = element.offsetWidth < element.scrollWidth;
    if (contentOverflow) {
      setEllipsis(true);
    }
  }, []);

  return (
    <Container
      onMouseMove={(e) => {
        if (isEllipsisActive) {
          setTooltip({ x: e.pageX, y: e.pageY, visible: true });
        }
      }}
      onMouseLeave={() => {
        if (isEllipsisActive) setTooltip({ x: 0, y: 0, visible: false });
      }}
      padding={padding}
      onClick={(e) => onClick(e, propertyPath)}
    >
      <Name ref={nameRef}>{propertyName}</Name>
      <Type>{type}</Type>
      <AnimatePresence>
        {tooltip.visible && (
          <Portal modalContainer={modalContainer}>
            <motion.div
              {...tooltipMotion}
              data-testid="property-tooltip"
              initial={{ opacity: 0, x: tooltip.x, y: tooltip.y }}
              animate={{
                x: tooltip.x,
                y: tooltip.y,
                opacity: 1,
              }}
              style={{
                zIndex: 2,
                position: 'absolute',
                pointerEvents: 'none',
              }}
            >
              <Tooltip mode="dark" hasArrow={false}>
                {propertyPath
                  .split(SEPARATOR)
                  .map((path: string, idx: number, collection) => (
                    <Path isBold={idx + 1 === collection.length} key={idx}>
                      {idx > 0 ? '.' : ''}
                      {path}
                    </Path>
                  ))}
              </Tooltip>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default PropertyTreeItem;
