import React, { FC } from 'react';

import { Wrapper, Container, Title, Message } from './QueryLimitReached.styles';
import text from './text.json';

const QueryLimitReached:FC<{}> = () => {
  return (
    <Wrapper>
      <Container>
        <Title>{text.title}</Title>
        <Message>{text.first_line}</Message>
        <Message>{text.second_line}</Message>
      </Container>
    </Wrapper>
  );
};

export default QueryLimitReached;
