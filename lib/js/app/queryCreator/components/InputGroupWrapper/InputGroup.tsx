import React, { FC } from 'react';

import { Container } from './InputGroup.styles';

type Props = {
  // /** Property name */
  // property: string;
  // /** Remove event handler */
  // onRemove: () => void;
  // /** Change property event handler */
  // onChange: (property: string) => void;
  // /** Dragged indicator */
  // isDragged: boolean;
  // /** Properties schema collection */
  // propertiesSchema: { path: string; type: string }[];
  // /** Collection properties schema in tree structure */
  // propertiesTree: Record<string, string[] | Record<string, any>>;
  isDragged: boolean;
  isActive: boolean;
  children: React.ReactNode;
};

const InputGroupWrapper: FC<Props> = ({
  isDragged,
  isActive,
  // property,
  // propertiesSchema,
  // propertiesTree,
  children,
  // onChange,
  // onRemove
}) => {
  // const [editMode, setEditMode] = useState(true);

  return (
    <Container isActive={isActive} isDragged={isDragged}>{children}</Container>
  );
}

export default InputGroupWrapper;
