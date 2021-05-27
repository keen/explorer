import React, { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { BodyText, FontWeight, Headline } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import {
  Wrapper,
  Container,
  TitleContainer,
} from './NoPropertiesOnEventStream.styles';

type Props = {
  missingEventStreams: string[];
};

const NoPropertiesOnEventStream: FC<Props> = ({ missingEventStreams }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Container>
        <TitleContainer>
          <Headline variant="h3" fontWeight={400} color={colors.gray[500]}>
            {t('browser_preview.unable_to_run_query')}
          </Headline>
        </TitleContainer>
        <BodyText variant="body1" color={colors.red[500]} lineHeight="26px">
          <Trans
            components={{ bold: <FontWeight fontWeight="bold" /> }}
            i18nKey={'browser_preview.the_event_stream_do_not_exist'}
            count={missingEventStreams.length}
            values={{ stream: missingEventStreams.join(', ') }}
          />
        </BodyText>
      </Container>
    </Wrapper>
  );
};

export default NoPropertiesOnEventStream;
