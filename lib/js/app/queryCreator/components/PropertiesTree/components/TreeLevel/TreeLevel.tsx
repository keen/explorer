import React, { FC, useState, useEffect } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Header, Title, MotionIcon } from './TreeLevel.styles';
import PropertyTreeItem from '../../../PropertyTreeItem';

import { getPropertyType, getPropertyPath } from '../../utils';

import { PADDING } from '../../constants';

type Props = {
  /** Header title */
  header: string;
  /** Tree properties */
  properties: Record<string, string[] | Object>;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
  /** Nested level count */
  level?: number;
  /** Expand all tree levels */
  expanded?: boolean;
};

const TreeLevel: FC<Props> = ({
  header,
  onClick,
  level,
  expanded,
  properties,
}) => {
  const [isOpen, setOpen] = useState(expanded);

  useEffect(() => {
    setOpen(expanded);
  }, [expanded]);

  const keys = Object.keys(properties);

  return (
    <div data-testid="tree-level">
      <Header
        onClick={() => setOpen(!isOpen)}
        style={{ paddingLeft: level * PADDING, paddingRight: PADDING }}
      >
        <Title>{header}</Title>
        <MotionIcon
          initial={false}
          animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
        >
          <Icon
            type="caret-right"
            fill={colors.blue[500]}
            width={10}
            height={10}
          />
        </MotionIcon>
      </Header>
      {isOpen &&
        keys.map((key) => {
          if (Array.isArray(properties[key])) {
            return (
              <PropertyTreeItem
                key={key}
                propertyName={key}
                propertyPath={getPropertyPath(properties[key] as string[])}
                padding={(level + 1) * PADDING}
                type={getPropertyType(properties[key] as string[])}
                onClick={(e, propertyPath) => onClick(e, propertyPath)}
              />
            );
          } else {
            return (
              <TreeLevel
                key={key}
                header={key}
                expanded={expanded}
                level={level + 1}
                onClick={onClick}
                properties={properties[key] as Record<string, any>}
              />
            );
          }
        })}
    </div>
  );
};

export default TreeLevel;
