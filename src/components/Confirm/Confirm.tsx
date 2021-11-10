import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { useTranslation, Trans } from 'react-i18next';
import { colors } from '@keen.io/colors';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Anchor,
  Button,
} from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';

import {
  Title,
  Close,
  Footer,
  Description,
  QueryNotUsed,
  NoDashboardsInfo,
  ConnectedDashboardsWrapper,
} from './Confirm.styles';
import { DashboardsLoader } from './components';

import DashboardsList from '../DashboardsList';

import { appActions, appSelectors } from '../../modules/app';
import { savedQuerySelectors } from '../../modules/savedQuery';
import { AppContext } from '../../contexts';

const Confirm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { visible } = useSelector(appSelectors.getConfirmation);
  const { displayName } = useSelector(savedQuerySelectors.getSavedQuery);
  const [inViewRef, inView] = useInView();

  const { enableDashboardsConnection } = useContext(AppContext);

  const closeHandler = () => dispatch(appActions.hideConfirmation());

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
              <DashboardsLoader />
            ) : (
              <>
                <div>
                  <BodyText
                    variant="body1"
                    color={colors.black[500]}
                    lineHeight={1.5}
                  >
                    <Trans
                      components={{
                        bold: (
                          <BodyText
                            variant="body1"
                            color={colors.black[500]}
                            lineHeight={1.5}
                            fontWeight="bold"
                            enableTextEllipsis
                          />
                        ),
                      }}
                      i18nKey={'confirm.delete_message'}
                      values={{ query: displayName }}
                    />
                  </BodyText>
                </div>
                {enableDashboardsConnection && (
                  <>
                    {connectedDashboards && connectedDashboards.length > 0 ? (
                      <ConnectedDashboardsWrapper data-testid="connected-dashboards">
                        <BodyText
                          variant="body1"
                          color={colors.black[500]}
                          lineHeight={1.5}
                        >
                          {t('confirm.connected_dashboards_info')}
                        </BodyText>
                        <DashboardsList dashboards={connectedDashboards} />
                        <div ref={inViewRef}></div>
                      </ConnectedDashboardsWrapper>
                    ) : (
                      <NoDashboardsInfo>
                        {isConnectedDashboardsError ? (
                          <BodyText
                            variant="body1"
                            color={colors.red[500]}
                            data-testid="connected-dashboards-error"
                          >
                            {t('confirm.unable_to_get_connected_dashboards')}
                          </BodyText>
                        ) : (
                          <QueryNotUsed>
                            <BodyText variant="body1" color={colors.black[500]}>
                              {t(
                                'confirm.query_not_connected_to_any_dashboard'
                              )}
                            </BodyText>
                          </QueryNotUsed>
                        )}
                      </NoDashboardsInfo>
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
                onClick={() => dispatch(appActions.acceptConfirmation())}
              >
                {t('confirm.button_label')}
              </Button>
              <Close>
                <Anchor
                  onClick={() => dispatch(appActions.hideConfirmation())}
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
