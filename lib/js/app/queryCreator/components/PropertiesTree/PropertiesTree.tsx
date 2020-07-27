import React, { FC } from 'react';

import { List } from './PropertiesTree.styles';

import TreeLevel from './TreeLevel';

type Props = {
  properties: Record<string, string[] | Object>;
  onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
  /** */
  openable?: boolean;
  /** Open indicator */
  isOpen?: boolean;
};

const PropertiesTree: FC<Props> = ({ openable, onClick, properties }) => {
  const keys = Object.keys(properties);

  return (
    <List data-testid="properties-tree">
      {keys.map((key) => {
        if (Array.isArray(properties[key])) {
          return (
            <div
              style={{ paddingLeft: 15 }}
              key={key}
              onClick={(e) => onClick(e, properties[key][0])}
            >
              <span>{key}</span> {properties[key][1]}
            </div>
          );
        } else {
          return (
            <TreeLevel
              key={key}
              nestLevel={1}
              onClick={onClick}
              header={key}
              properties={properties[key] as Record<string, any>}
            />
          );
        }
      })}
    </List>
  );
};

export default PropertiesTree;
