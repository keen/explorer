import React, { FC } from 'react';

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
    <ul data-element="properties-tree">
      {keys.map((key) => {
        if (Array.isArray(properties[key])) {
          return (
            <div key={key} onClick={(e) => onClick(e, properties[key][0])}>
              {key} {properties[key][1]}
            </div>
          );
        } else {
          return (
            <div key={key}>
              <TreeLevel
                onClick={onClick}
                header={key}
                properties={properties[key] as Record<string, any>}
              />
            </div>
          );
        }
      })}
    </ul>
  );
};

export default PropertiesTree;
