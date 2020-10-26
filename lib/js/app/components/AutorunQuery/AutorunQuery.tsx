import React, { FC } from 'react';
import { Toggle } from '@keen.io/ui-core';

import { Container, Label } from './AutorunQuery.styles';

type Props = {
  /** Toggle autorun event handler */
  onToggle: (autorun: boolean) => void;
  /** Autorun query indicator */
  autorun: boolean;
  /** Settings label */
  label: string;
};

const AutorunQuery: FC<Props> = ({ autorun, label, onToggle }) => (
  <Container>
    <Label>{label}</Label>
    <Toggle isOn={autorun} onChange={onToggle} />
  </Container>
);

export default AutorunQuery;
