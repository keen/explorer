import React, { FC, useContext, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

import {
  getVisualization,
  getEmbedModalVisibility,
  hideEmbedModal,
  copyEmbeddedCode,
  downloadCodeSnippet,
} from '../../modules/app';
import { getQuerySettings } from '../../modules/queries';

import { AppContext } from '../../contexts';

import { createCodeSnippet } from '../../utils';

import text from './text.json';

const EmbedWidgetModal: FC = () => {
  const dispatch = useDispatch();
  const { modalContainer, keenAnalysis } = useContext(AppContext);
  const { projectId, readKey } = keenAnalysis.config;

  const isOpen = useSelector(getEmbedModalVisibility);
  const { type: widget } = useSelector(getVisualization);
  const query = useSelector(getQuerySettings);

  const code = useMemo(
    () =>
      createCodeSnippet({
        widget,
        query,
        projectId,
        readKey,
      }),
    [widget, query]
  );

  const closeHandler = useCallback(() => {
    dispatch(hideEmbedModal());
  }, []);

  return (
    <Portal modalContainer={modalContainer}>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        {() => (
          <>
            <ModalHeader onClose={closeHandler}>{text.embedHTML}</ModalHeader>
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
                      dispatch(copyEmbeddedCode(projectId, readKey))
                    }
                  >
                    {text.copyCode}
                  </Button>
                </NavigationItem>
                <NavigationItem>
                  <Button
                    variant="secondary"
                    style="outline"
                    onClick={() =>
                      dispatch(downloadCodeSnippet(projectId, readKey))
                    }
                  >
                    {text.downloadFile}
                  </Button>
                </NavigationItem>
                <NavigationItem>
                  <Link onClick={closeHandler}>{text.close}</Link>
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
