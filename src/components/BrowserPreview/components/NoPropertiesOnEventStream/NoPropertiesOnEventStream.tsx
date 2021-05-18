import React, { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  Wrapper,
  Container,
  Title,
  Message,
} from './NoPropertiesOnEventStream.styles';

type Props = {
  missingEventStreams: string[];
};

const NoPropertiesOnEventStream: FC<Props> = ({ missingEventStreams }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Container>
        <Title>{t('browser_preview.unable_to_run_query')}</Title>
        <Message>
          <Trans
            components={{ bold: <strong /> }}
            i18nKey={
              missingEventStreams.length > 1
                ? 'browser_preview.the_event_stream_do_not_exist_plural'
                : 'browser_preview.the_event_stream_do_not_exist'
            }
            values={{ stream: missingEventStreams.join(', ') }}
          />
        </Message>
      </Container>
    </Wrapper>
  );
};

export default NoPropertiesOnEventStream;
