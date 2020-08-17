import { StackElement, TreeData } from '../types';

const createTreeWalker = (
  properties: Record<string, string[] | Record<string, any>>,
  isOpenByDefault: boolean
) => {
  return function* treeWalker(
    refreshTree: boolean
  ): Generator<TreeData | string | symbol, void, boolean> {
    const stack: StackElement[] = [];

    Object.keys(properties).forEach((propertyKey) => {
      stack.push({
        deepnessLevel: 0,
        node: {
          id: propertyKey,
          name: propertyKey,
          children: properties[propertyKey],
        },
      });
    });

    while (stack.length !== 0) {
      const {
        node: { children, id, name },
        deepnessLevel,
      } = stack.pop();

      const isOpened = yield refreshTree
        ? {
            id,
            isLeaf: Array.isArray(children),
            schemaMeta: Array.isArray(children) ? children : null,
            isOpenByDefault,
            deepnessLevel,
            name,
          }
        : id;

      if (
        !Array.isArray(children) &&
        Object.keys(children).length !== 0 &&
        isOpened
      ) {
        Object.keys(children).forEach((key) => {
          stack.push({
            deepnessLevel: deepnessLevel + 1,
            node: {
              name: key,
              id: `${id}.${key}`,
              children: children[key],
            },
          });
        });
      }
    }
  };
};

export default createTreeWalker;
