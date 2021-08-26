import React, { FC, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import {
  Portal,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  Anchor,
  FadeLoader,
} from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

import { appActions, appSelectors } from '../../modules/app';

import { savedQuerySelectors } from '../../modules/savedQuery';
import { queriesActions } from '../../modules/queries';

import { AppContext } from '../../contexts';

import { DashboardsList } from './components';
import {
  FooterContent,
  Content,
  Cancel,
  Loader,
  Error,
} from './UpdateSavedQueryModal.style';

const UpdateSavedQueryModal: FC = () => {
  const dispatch = useDispatch();
  const { modalContainer } = useContext(AppContext);
  const { t } = useTranslation();
  const [inViewRef, inView] = useInView();

  const isOpen = useSelector(appSelectors.getUpdateSavedQueryModalVisibility);
  const isConnectedDashboardsLoading = useSelector(
    savedQuerySelectors.getConnectedDashboardsLoading
  );
  const isConnectedDashboardsError = useSelector(
    savedQuerySelectors.getConnectedDashboardsError
  );
  const connectedDashboards = useSelector(
    savedQuerySelectors.getConnectedDashboards
  );
  const { displayName, refreshRate, tags, name } = useSelector(
    savedQuerySelectors.getSavedQuery
  );
  const onClose = () => dispatch(appActions.hideUpdateSavedQueryModal());

  return (
    <Portal modalContainer={modalContainer}>
      <Modal isOpen={isOpen} onClose={onClose}>
        {() => (
          <>
            <ModalHeader onClose={onClose}>
              {t('update_saved_query.modal_title')}
            </ModalHeader>
            <Content isOverflow={!inView}>
              <BodyText variant="body1" color={colors.black[300]}>
                {t('update_saved_query.saved_query_usage')}
              </BodyText>
              {connectedDashboards?.length && (
                <DashboardsList dashboards={connectedDashboards} />
              )}
              {isConnectedDashboardsError && (
                <Error>
                  <BodyText variant="body1" color={colors.red[500]}>
                    {t('update_saved_query.dashboard_connection_error')}
                  </BodyText>
                </Error>
              )}
              {isConnectedDashboardsLoading && (
                <Loader>
                  <FadeLoader color={colors.blue[500]} height={40} width={40} />
                </Loader>
              )}
              <BodyText
                variant="body1"
                color={colors.black[300]}
                ref={inViewRef}
              >
                {t('update_saved_query.saved_query_update')}
              </BodyText>
            </Content>
            <ModalFooter>
              <FooterContent>
                <Button
                  data-testid="save-query"
                  variant="secondary"
                  style="solid"
                  onClick={() => {
                    dispatch(
                      appActions.saveQuery(displayName, refreshRate, tags, name)
                    );
                    onClose();
                  }}
                >
                  {t('update_saved_query.update_query')}
                </Button>
                <Button
                  data-testid="clone-query"
                  variant="secondary"
                  style="outline"
                  onClick={() => {
                    dispatch(queriesActions.cloneSavedQuery());
                    onClose();
                  }}
                >
                  {t('update_saved_query.clone_query')}
                </Button>
                <Cancel>
                  <Anchor
                    onClick={onClose}
                    color={colors.blue[500]}
                    hoverColor={colors.blue[300]}
                  >
                    {t('update_saved_query.cancel')}
                  </Anchor>
                </Cancel>
              </FooterContent>
            </ModalFooter>
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default UpdateSavedQueryModal;
