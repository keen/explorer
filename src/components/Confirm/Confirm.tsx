import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { colors } from '@keen.io/colors';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Anchor,
  Button,
  FadeLoader,
} from '@keen.io/ui-core';

import {
  Title,
  Close,
  Footer,
  Description,
  Name,
  QueryNotUsedInfo,
  CheckingDashboardConnectionsInfo,
  NoConnectedDashboards,
} from './Confirm.styles';

import {
  getConfirmation,
  hideConfirmation,
  acceptConfirmation,
} from '../../modules/app';
import { savedQuerySelectors } from '../../modules/savedQuery';
import { DashboardsList } from '../UpdateSavedQueryModal/components';
import { useInView } from 'react-intersection-observer';
import { Loader } from '../UpdateSavedQueryModal/UpdateSavedQueryModal.style';
import { BodyText } from '@keen.io/typography';
import { AppContext } from '../../contexts';

const Confirm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { visible } = useSelector(getConfirmation);
  const { displayName } = useSelector(savedQuerySelectors.getSavedQuery);
  const [inViewRef, inView] = useInView();

  const { enableDashboardsConnection } = useContext(AppContext);

  const closeHandler = () => dispatch(hideConfirmation());

  const isConnectedDashboardsError = useSelector(
    savedQuerySelectors.getConnectedDashboardsError
  );

  const isConnectedDashboardsLoading = useSelector(
    savedQuerySelectors.getConnectedDashboardsLoading
  );

  const connectedDashboards = useSelector(
    savedQuerySelectors.getConnectedDashboards
  );

  return (
    <Modal isOpen={visible} onClose={closeHandler}>
      {() => (
        <>
          <ModalHeader onClose={closeHandler}>
            <Title>{t('confirm.delete_query_title')}</Title>
          </ModalHeader>
          <Description
            isOverflow={
              !inView && connectedDashboards && connectedDashboards.length > 0
            }
          >
            {enableDashboardsConnection && isConnectedDashboardsLoading ? (
              <>
                <Loader>
                  <FadeLoader color={colors.blue[500]} height={40} width={47} />
                </Loader>
                <CheckingDashboardConnectionsInfo>
                  <BodyText variant="body2" color={colors.blue[500]}>
                    {t('confirm.checking_dashboard_connections')}
                  </BodyText>
                </CheckingDashboardConnectionsInfo>
              </>
            ) : (
              <>
                {t('confirm.delete_message_head')}
                <Name>{displayName}</Name>
                {t('confirm.delete_message_tail')}
                {enableDashboardsConnection && (
                  <>
                    {connectedDashboards && connectedDashboards.length > 0 ? (
                      <>
                        <p>{t('confirm.connected_dashboards_info')}</p>
                        <DashboardsList dashboards={connectedDashboards} />
                        <div ref={inViewRef}></div>
                      </>
                    ) : (
                      <NoConnectedDashboards>
                        {isConnectedDashboardsError ? (
                          <BodyText variant="body1" color={colors.red[500]}>
                            {t('confirm.unable_to_get_connected_dashboards')}
                          </BodyText>
                        ) : (
                          <QueryNotUsedInfo>
                            {t('confirm.query_not_connected_to_any_dashboard')}
                          </QueryNotUsedInfo>
                        )}
                      </NoConnectedDashboards>
                    )}
                  </>
                )}
              </>
            )}
          </Description>
          <ModalFooter>
            <Footer>
              <Button
                htmlType="button"
                variant="danger"
                style="solid"
                isDisabled={isConnectedDashboardsLoading}
                onClick={() => dispatch(acceptConfirmation())}
              >
                {t('confirm.button_label')}
              </Button>
              <Close>
                <Anchor
                  onClick={() => dispatch(hideConfirmation())}
                  color={colors.blue[500]}
                  hoverColor={colors.blue[300]}
                >
                  {t('confirm.cancel_label')}
                </Anchor>
              </Close>
            </Footer>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default Confirm;
