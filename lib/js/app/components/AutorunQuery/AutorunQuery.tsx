import React, { FC } from 'react';
import { Toggle } from '@keen.io/ui-core';

import { Container, Label } from './AutorunQuery.styles';
import text from './text.json';

type Props = {
  /** Toggle autorun event handler */
  onToggle: (autorun: boolean) => void;
  /** Autorun query indicator */
  autorun: boolean;
};

const AutorunQuery: FC<Props> = ({ autorun, onToggle }) => (
  <Container>
    <Label>{text.label}</Label>
    <Toggle isOn={autorun} onChange={onToggle} />
  </Container>
);

export default AutorunQuery;
