import React, { FC, useState, useEffect } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Header, MotionIcon } from './TreeLevel.styles';
import TreeLeaf from '../TreeLeaf';

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
        style={{ paddingLeft: level * PADDING }}
      >
        {header}
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
              <TreeLeaf
                key={key}
                padding={(level + 1) * PADDING}
                name={key}
                type={properties[key][1]}
                onClick={(e) => {
                  onClick(e, properties[key][0]);
                }}
              />
            );
          } else {
            return (
              <div key={key}>
                <TreeLevel
                  expanded={expanded}
                  level={level + 1}
                  onClick={onClick}
                  header={key}
                  properties={properties[key] as Record<string, any>}
                />
              </div>
            );
          }
        })}
    </div>
  );
};

export default TreeLevel;
