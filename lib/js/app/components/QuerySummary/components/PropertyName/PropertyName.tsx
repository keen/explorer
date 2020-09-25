import React, { FC } from 'react';

import { Divider } from './PropertyName.styles';

type Props = {
  name: string;
};

const DIVIDER_MARK = '>';

const PropertyName: FC<Props> = ({ name }) => {
  const nameArr = name.split('.');

  return (
    <>
      {nameArr.map((item, idx) => (
        <span key={idx}>
          {item}
          {idx < nameArr.length - 1 && <Divider>{DIVIDER_MARK}</Divider>}
        </span>
      ))}
    </>
  );
};

export default PropertyName;
