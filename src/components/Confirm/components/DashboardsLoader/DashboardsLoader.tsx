import React from 'react';
import { useTranslation } from 'react-i18next';

import { FadeLoader, Loader } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

import { LoaderInfo } from '../../Confirm.styles';

export const DashboardsLoader = () => {
  const { t } = useTranslation();
  return (
    <div data-testid="loader">
      <Loader>
        <FadeLoader color={colors.blue[500]} height={40} width={47} />
      </Loader>
      <LoaderInfo>
        <BodyText variant="body2" color={colors.blue[500]}>
          {t('confirm.checking_dashboard_connections')}
        </BodyText>
      </LoaderInfo>
    </div>
  );
};
