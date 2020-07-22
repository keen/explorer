import React, { FC, useState } from 'react';

type Props = {
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
  /** Header title */
  header: string;
  /** Tree properties */
  properties: Record<string, string[] | Object>;
};

const TreeLevel: FC<Props> = ({ header, onClick, properties }) => {
  const [isOpen, setOpen] = useState(false);

  const keys = Object.keys(properties);

  return (
    <div>
      <h6 onClick={() => setOpen(!isOpen)}>{header}</h6>
      {isOpen &&
        keys.map((key) => {
          if (Array.isArray(properties[key])) {
            return (
              <div onClick={(e) => onClick(e, properties[key][0])} key={key}>
                <span>{key}</span> {properties[key][1]}
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
    </div>
  );
};

export default TreeLevel;
