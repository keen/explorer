import React, { FC } from 'react';
import { Button, FadeLoader } from '@keen.io/ui-core';

type Props = {
  /** Progress indicator */
  isLoading: boolean;
  /** Click event handler */
  onClick: () => void;
  /** Children nodes */
  children?: React.ReactNode;
};

const RunQuery: FC<Props> = ({ children, onClick, isLoading }) => (
  <Button
    onClick={onClick}
    isDisabled={isLoading}
    variant="success"
    size="large"
    icon={isLoading && <FadeLoader />}
  >
    {children}
  </Button>
);

export default RunQuery;
