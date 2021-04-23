import React, { FC } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

import { Container, IconContainer, Item } from './PropertyName.styles';

type Props = {
  name: string;
};

const PropertyName: FC<Props> = ({ name }) => {
  const nameArr = name.split('.');

  return (
    <Container>
      {nameArr.map((item, idx) => (
        <Item key={idx}>
          <BodyText variant="body2">{item}</BodyText>
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
        </Item>
      ))}
    </Container>
  );
};

export default PropertyName;
