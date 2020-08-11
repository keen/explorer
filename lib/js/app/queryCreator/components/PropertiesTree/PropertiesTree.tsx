import React, { FC, useRef, useEffect } from 'react';
import {
  FixedSizeTree as Tree,
  FixedSizeNodeComponentProps,
} from 'react-vtree';

import { TreeLeaf, TreeNode } from './components';
import { createTreeWalker, getPropertyPath, getPropertyType } from './utils';

import { LIST_HEIGHT, ELEMENT_HEIGHT } from './constants';

import { TreeData } from './types';

type Props = {
  /** Properties tree */
  properties: Record<string, string[] | Record<string, any>>;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
  /** The curent active property */
  activeProperty?: string;
  /** Expand all tree levels */
  expanded?: boolean;
};

const Node: FC<FixedSizeNodeComponentProps<TreeData>> = ({
  data: { name, isLeaf, schemaMeta, deepnessLevel },
  isOpen,
  style,
  toggle,
  treeData,
}) => {
  const { activeProperty, onSelectProperty } = treeData;

  return (
    <div style={style}>
      {isLeaf ? (
        <TreeLeaf
          isActive={activeProperty === getPropertyPath(schemaMeta)}
          propertyName={name}
          onClick={onSelectProperty}
          deepnessLevel={deepnessLevel}
          propertyType={getPropertyType(schemaMeta)}
          propertyPath={getPropertyPath(schemaMeta)}
        />
      ) : (
        <TreeNode
          name={name}
          isOpen={isOpen}
          deepnessLevel={deepnessLevel}
          onClick={toggle}
        />
      )}
    </div>
  );
};

const PropertiesTree: FC<Props> = ({
  expanded,
  onClick,
  activeProperty,
  properties,
}) => {
  const treeRef = useRef(null);
  const expandTrigger = useRef(null);

  useEffect(() => {
    if (expandTrigger.current) clearTimeout(expandTrigger.current);
    if (treeRef.current) {
      treeRef.current.recomputeTree({
        refreshNodes: true,
        useDefaultOpenness: true,
      });
    }
  }, [expanded, treeRef]);

  return (
    <div data-testid="properties-tree">
      <Tree
        ref={treeRef}
        treeWalker={createTreeWalker(properties, expanded)}
        itemData={{ activeProperty, onSelectProperty: onClick }}
        itemSize={ELEMENT_HEIGHT}
        height={LIST_HEIGHT}
        width="100%"
      >
        {Node}
      </Tree>
    </div>
  );
};

export default PropertiesTree;
