import React, { useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ModalHeader } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { AppContext } from '../../../../contexts';
import { appActions, appSelectors } from '../../../../modules/app';
import { getQuerySettings } from '../../../../modules/queries';
import { createBodyCode, createHeadCode } from '../../../../utils';

import {
  EmbedLabel,
  ModalBody,
  ModalWrapper,
  Navigation,
  NavigationItem,
  Section,
  StepLabel,
  StepNumber,
} from '../../EmbedWidgetModal.styles';

import { Syntax } from '../index';

const EmbedWidget = () => {
  const { t } = useTranslation(null, { useSuspense: false });
  const dispatch = useDispatch();
  const { keenAnalysis, datavizSettings } = useContext(AppContext);
  const { projectId, readKey } = keenAnalysis.config;
  const theme = datavizSettings.theme;

  const { type: widget, widgetSettings, chartSettings } = useSelector(
    appSelectors.getVisualization
  );
  const query = useSelector(getQuerySettings);

  const headCode = useMemo(() => createHeadCode(), []);

  const bodyCode = useMemo(
    () =>
      createBodyCode({
        widget,
        query,
        chartSettings: { ...chartSettings, theme },
        widgetSettings,
        projectId,
        readKey,
      }),
    []
  );

  const closeHandler = useCallback(
    () => dispatch(appActions.hideEmbedModal()),
    []
  );

  return (
    <ModalWrapper>
      <ModalHeader onClose={closeHandler}>
        {t('embed_widget.embed_html_title')}
      </ModalHeader>
      <ModalBody>
        <EmbedLabel>
          <BodyText
            variant="body2"
            color={colors.green[500]}
            fontWeight={'bold'}
          >
            {t('embed_widget.embed_title')}
          </BodyText>
        </EmbedLabel>
        <BodyText variant="body2">{t('embed_widget.embed_text')}</BodyText>
        <Section>
          <StepLabel>
            <StepNumber>
              <BodyText
                variant="body2"
                color={colors.green[500]}
                fontWeight={'bold'}
              >
                {t('embed_widget.embed_step_label')} 1
              </BodyText>
            </StepNumber>
            <BodyText
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: t('embed_widget.embed_step_first', {
                  tag: '<strong>&lt;head&gt;</strong>',
                  interpolation: { escapeValue: false },
                }),
              }}
            ></BodyText>
          </StepLabel>
          <Syntax code={headCode} />
        </Section>
        <Section>
          <StepLabel>
            <StepNumber>
              <BodyText
                variant="body2"
                color={colors.green[500]}
                fontWeight={'bold'}
              >
                {t('embed_widget.embed_step_label')} 2
              </BodyText>
            </StepNumber>
            <BodyText
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: t('embed_widget.embed_step_second', {
                  tag: '<strong>&lt;body&gt;</strong>',
                  interpolation: { escapeValue: false },
                }),
              }}
            />
          </StepLabel>
          <Syntax code={bodyCode} />
        </Section>
      </ModalBody>
      <Navigation>
        <NavigationItem>
          <BodyText variant="body2">
            {t('embed_widget.do_you_need_full_page_code')}
          </BodyText>
        </NavigationItem>
        <NavigationItem>
          <Button
            variant="secondary"
            style="outline"
            onClick={() =>
              dispatch(appActions.downloadCodeSnippet(projectId, readKey))
            }
          >
            {t('embed_widget.download_file_button')}
          </Button>
        </NavigationItem>
      </Navigation>
    </ModalWrapper>
  );
};

export default EmbedWidget;
