import React, { FC, useState } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Header, MotionIcon } from './TreeLevel.styles';

type Props = {
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
  /** Header title */
  header: string;
  /** Tree properties */
  properties: Record<string, string[] | Object>;
  initialLevel?: boolean;
  /** Nested level count */
  nestLevel?: number;
};

const TreeLevel: FC<Props> = ({ header, onClick, nestLevel, properties }) => {
  const [isOpen, setOpen] = useState(false);

  const keys = Object.keys(properties);

  return (
    <div data-testid="tree-level">
      <Header
        onClick={() => setOpen(!isOpen)}
        style={{ paddingLeft: nestLevel * 15 }}
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
              <div
                style={{ paddingLeft: (nestLevel + 1) * 15 }}
                onClick={(e) => onClick(e, properties[key][0])}
                key={key}
              >
                <span>{key}</span> {properties[key][1]}
              </div>
            );
          } else {
            return (
              <div key={key}>
                <TreeLevel
                  nestLevel={nestLevel + 1}
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
