import React, { FC } from 'react';
import { Icon } from '@keen.io/icons';
import { FadeLoader } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { Container, Text } from './VisualizationPlaceholder.styles';
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
          <FadeLoader width={50} height={50} color={colors.blue['500']} />
          <Text>{text.loadingPlaceholder}</Text>
        </>
      ) : (
        <>
          <Icon type="brand" width={50} height={50} fill={colors.blue['500']} />
          <Text>{text.placeholder}</Text>
        </>
      )}
    </Container>
  );
};

export default VisualizationPlaceholder;
