import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FadeLoader } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import {
  ButtonWrapper,
  Container,
  Text,
  LoaderWrapper,
} from './VisualizationPlaceholder.styles';

type Props = {
  /** Loading indicator */
  isLoading: boolean;
  /** Run query event handler */
  onRunQuery?: () => void;
};

const VisualizationPlaceholder: FC<Props> = ({ isLoading, onRunQuery }) => {
  const { t } = useTranslation('common');
  return (
    <Container>
      {isLoading ? (
        <>
          <LoaderWrapper>
            <FadeLoader width={60} height={60} color={colors.blue['500']} />
          </LoaderWrapper>
          <Text color={colors.blue['500']}>
            {t('visualization_placeholder.loading_message')}
          </Text>
        </>
      ) : (
        <>
          <Text>{t('visualization_placeholder.message')}</Text>
          {onRunQuery && (
            <ButtonWrapper>
              <Button variant="success" onClick={onRunQuery}>
                {t('visualization_placeholder.run_query_button')}
              </Button>
            </ButtonWrapper>
          )}
        </>
      )}
    </Container>
  );
};

export default VisualizationPlaceholder;
