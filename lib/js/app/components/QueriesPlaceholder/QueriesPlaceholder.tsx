import React, { FC } from 'react';

import { Container, Placeholder } from './QueriesPlaceholder.styles';

type Props = {};

const QueriesPlaceholder: FC<Props> = () => (
  <Container data-testid="queries-placeholder">
    <Placeholder opacityAmount={0.8} />
    <Placeholder opacityAmount={0.82} />
    <Placeholder opacityAmount={0.84} />
    <Placeholder opacityAmount={0.86} />
    <Placeholder opacityAmount={0.88} />
    <Placeholder opacityAmount={0.9} />
    <Placeholder opacityAmount={0.92} />
  </Container>
);

export default QueriesPlaceholder;
