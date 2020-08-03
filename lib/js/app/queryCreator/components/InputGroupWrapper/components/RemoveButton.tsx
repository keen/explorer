import React, { FC } from 'react';
import { StyledButton } from './RemoveButton.styles';

type Props = {
  onClick: () => void;
};

const RemoveButton: FC<Props> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>×</StyledButton>
  );
};

export default RemoveButton;
