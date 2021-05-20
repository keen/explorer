import React, { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { BodyText, FontWeight } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { Wrapper, Container, Title } from './NoPropertiesOnEventStream.styles';

type Props = {
  missingEventStreams: string[];
};

const NoPropertiesOnEventStream: FC<Props> = ({ missingEventStreams }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Container>
        <Title>{t('browser_preview.unable_to_run_query')}</Title>
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
