import React, { FC } from 'react';
import { Label, Input } from '@keen.io/ui-core';

import text from './text.json';

type Props = {};

const Limit: FC<Props> = () => {
  return (
    <>
      <Label htmlFor="limit">{text.label}</Label>
      <Input type="number" id="limit" variant="solid" />
    </>
  );
}

export default Limit;
