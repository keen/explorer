import React, { FC, useContext, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Portal,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
} from '@keen.io/ui-core';

import EmbedWidget from '../EmbedWidget';

import {
  Navigation,
  NavigationItem,
  Link,
  CodeWrapper,
} from './EmbedWidgetModal.styles';

import { appActions, appSelectors } from '../../modules/app';
import { getQuerySettings } from '../../modules/queries';

import { AppContext } from '../../contexts';
import { createCodeSnippet } from '../../utils';

const EmbedWidgetModal: FC = () => {
  const { t } = useTranslation(null, { useSuspense: false });
  const dispatch = useDispatch();
  const { modalContainer, keenAnalysis, datavizSettings } = useContext(
    AppContext
  );
  const { projectId, readKey } = keenAnalysis.config;
  const theme = datavizSettings.theme;

  const isOpen = useSelector(appSelectors.getEmbedModalVisibility);
  const { type: widget, chartSettings, widgetSettings } = useSelector(
    appSelectors.getVisualization
  );
  const query = useSelector(getQuerySettings);

  const code = useMemo(
    () =>
      createCodeSnippet({
        widget,
        query,
        chartSettings: { ...chartSettings, theme },
        widgetSettings,
        projectId,
        readKey,
      }),
    [widget, query]
  );

  const closeHandler = useCallback(() => {
    dispatch(appActions.hideEmbedModal());
  }, []);

  return (
    <Portal modalContainer={modalContainer}>
      <Modal isOpen={isOpen} onClose={closeHandler} blockScrollOnOpen={false}>
        {() => (
          <>
            <ModalHeader onClose={closeHandler}>
              {t('embed_widget.embed_html_title')}
            </ModalHeader>
            <CodeWrapper>
              <EmbedWidget>{code}</EmbedWidget>
            </CodeWrapper>
            <ModalFooter>
              <Navigation>
                <NavigationItem>
                  <Button
                    variant="secondary"
                    style="solid"
                    onClick={() =>
                      dispatch(appActions.copyEmbeddedCode(projectId, readKey))
                    }
                  >
                    {t('embed_widget.copy_code_button')}
                  </Button>
                </NavigationItem>
                <NavigationItem>
                  <Button
                    variant="secondary"
                    style="outline"
                    onClick={() =>
                      dispatch(
                        appActions.downloadCodeSnippet(projectId, readKey)
                      )
                    }
                  >
                    {t('embed_widget.download_file_button')}
                  </Button>
                </NavigationItem>
                <NavigationItem>
                  <Link onClick={closeHandler}>
                    {t('embed_widget.close_button')}
                  </Link>
                </NavigationItem>
              </Navigation>
            </ModalFooter>
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default EmbedWidgetModal;
