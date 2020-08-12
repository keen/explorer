import React, { FC } from 'react';
import { FadeLoader } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { Container, Text, LoaderWrapper } from './VisualizationPlaceholder.styles';
import text from './text.json';

type Props = {
  /** Loading indicator */
  isLoading: boolean;
};

const VisualizationPlaceholder: FC<Props> = ({ isLoading }) => {
  return (
    <Container>
      {isLoading ? (
        <>
          <LoaderWrapper>
            <FadeLoader width={80} height={80} color={colors.blue['500']} />
          </LoaderWrapper>
          <Text color={colors.blue['500']}>{text.loadingPlaceholder}</Text>
        </>
      ) : (
        <>
          <Text>{text.placeholder}</Text>
        </>
      )}
    </Container>
  );
};

export default VisualizationPlaceholder;
