import { FixedSizeNodeData } from 'react-vtree';

export type DataNode = Readonly<{
  children: Record<string, any>;
  id: string;
  name: string;
}>;

export type StackElement = Readonly<{
  deepnessLevel: number;
  node: DataNode;
}>;

export type TreeData = FixedSizeNodeData &
  Readonly<{
    isLeaf: boolean;
    name: string;
    deepnessLevel: number;
    schemaMeta: any;
  }>;
