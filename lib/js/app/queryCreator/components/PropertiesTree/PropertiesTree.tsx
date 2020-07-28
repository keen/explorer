import React, { FC } from 'react';

import { TreeLevel } from './components';

import PropertyTreeItem from '../PropertyTreeItem';
import { getPropertyType, getPropertyPath } from './utils';

import { PADDING } from './constants';

type Props = {
  /** Properties tree */
  properties: Record<string, string[] | Object>;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
  /** The curent active property */
  activeProperty?: string;
  /** Expand all tree levels */
  expanded?: boolean;
};

const PropertiesTree: FC<Props> = ({
  expanded,
  onClick,
  activeProperty,
  properties,
}) => {
  const keys = Object.keys(properties);

  return (
    <div data-testid="properties-tree">
      {keys.map((key) => {
        if (Array.isArray(properties[key])) {
          return (
            <PropertyTreeItem
              key={key}
              padding={PADDING}
              propertyName={key}
              propertyPath={getPropertyPath(properties[key] as string[])}
              type={getPropertyType(properties[key] as string[])}
              isActive={
                activeProperty === getPropertyPath(properties[key] as string[])
              }
              onClick={(e, propertyPath) => onClick(e, propertyPath)}
            />
          );
        } else {
          return (
            <TreeLevel
              key={key}
              level={1}
              onClick={onClick}
              header={key}
              activeProperty={activeProperty}
              expanded={expanded}
              properties={properties[key] as Record<string, any>}
            />
          );
        }
      })}
    </div>
  );
};

export default PropertiesTree;
