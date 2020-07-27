import React, { FC } from 'react';

import { TreeLevel, TreeLeaf } from './components';

type Props = {
  /** Properties tree */
  properties: Record<string, string[] | Object>;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
  /** Expand all tree levels */
  expanded?: boolean;
  /** Open indicator */
  isOpen?: boolean;
};

const PropertiesTree: FC<Props> = ({ expanded, onClick, properties }) => {
  const keys = Object.keys(properties);

  return (
    <div data-testid="properties-tree">
      {keys.map((key) => {
        if (Array.isArray(properties[key])) {
          return (
            <TreeLeaf
              padding={15}
              name={key}
              type={properties[key][1]}
              key={key}
              onClick={(e) => onClick(e, properties[key][0])}
            />
          );
        } else {
          return (
            <TreeLevel
              key={key}
              level={1}
              onClick={onClick}
              header={key}
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
