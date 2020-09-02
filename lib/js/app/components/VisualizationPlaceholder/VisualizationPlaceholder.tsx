import React, { FC } from 'react';
import { Button, FadeLoader } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import {
  ButtonWrapper,
  Container,
  Text,
  LoaderWrapper,
} from './VisualizationPlaceholder.styles';
import text from './text.json';

type Props = {
  /** Loading indicator */
  isLoading: boolean;
  /** Run query event handler */
  onRunQuery?: () => void;
};

const VisualizationPlaceholder: FC<Props> = ({ isLoading, onRunQuery }) => {
  return (
    <Container>
      {isLoading ? (
        <>
          <LoaderWrapper>
            <FadeLoader width={60} height={60} color={colors.blue['500']} />
          </LoaderWrapper>
          <Text color={colors.blue['500']}>{text.loadingPlaceholder}</Text>
        </>
      ) : (
        <>
          <Text>{text.placeholder}</Text>
          {onRunQuery && (
            <ButtonWrapper>
              <Button variant="success" onClick={onRunQuery}>
                {text.runQuery}
              </Button>
            </ButtonWrapper>
          )}
        </>
      )}
    </Container>
  );
};

export default VisualizationPlaceholder;
