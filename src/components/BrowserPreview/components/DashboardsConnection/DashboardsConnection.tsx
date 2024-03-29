import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { BodyText } from '@keen.io/typography';
import { FadeLoader } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { savedQuerySelectors } from '../../../../modules/savedQuery';

import ConnectedDashboards from '../ConnectedDashboards';

import {
  Wrapper,
  Container,
  TitleContainer,
} from './DashboardsConnection.styles';

const DashboardsConnection: FC = () => {
  const { t } = useTranslation();

  const isConnectedDashboardsLoading = useSelector(
    savedQuerySelectors.getConnectedDashboardsLoading
  );
  const isConnectedDashboardsError = useSelector(
    savedQuerySelectors.getConnectedDashboardsError
  );
  const connectedDashboards = useSelector(
    savedQuerySelectors.getConnectedDashboards
  );

  return (
    <Wrapper>
      <Container>
        <TitleContainer>
          <BodyText variant="body2" fontWeight="bold">
            {t('browser_preview.on_dashboards')}
          </BodyText>
        </TitleContainer>
        {isConnectedDashboardsLoading && (
          <FadeLoader color={colors.blue[500]} height={14} />
        )}
        {isConnectedDashboardsError && (
          <BodyText variant="body2" color={colors.red[500]}>
            {t('browser_preview.dashboard_connection_error')}
          </BodyText>
        )}
        {!isConnectedDashboardsLoading && !isConnectedDashboardsError && (
          <ConnectedDashboards dashboards={connectedDashboards} />
        )}
      </Container>
    </Wrapper>
  );
};

export default DashboardsConnection;
