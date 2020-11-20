import React, { FC } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Container, IconContainer } from './PropertyName.styles';

type Props = {
  name: string;
};

const PropertyName: FC<Props> = ({ name }) => {
  const nameArr = name.split('.');

  return (
    <>
      {nameArr.map((item, idx) => (
        <Container key={idx}>
          <span>{item}</span>
          {idx < nameArr.length - 1 && (
            <IconContainer>
              <Icon
                type="caret-right"
                fill={colors.blue[100]}
                width={10}
                height={10}
              />
            </IconContainer>
          )}
        </Container>
      ))}
    </>
  );
};

export default PropertyName;
