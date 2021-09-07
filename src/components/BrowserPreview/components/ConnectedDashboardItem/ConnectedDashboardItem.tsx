import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { ConnectedDashboard } from '../../../../modules/savedQuery';
import { AppContext } from '../../../../contexts';

import { Anchor } from './ConnectedDashboardItem.styles';

type Props = {
  dashboard: ConnectedDashboard;
};

const ConnectedDashboardItem: FC<Props> = ({ dashboard }) => {
  const { t } = useTranslation();
  const { createDashboardUrl } = useContext(AppContext);

  const { id, title } = dashboard;

  const renderText = (color = colors.black[100]) => (
    <BodyText variant="body2" color={color}>
      {title || t('browser_preview.untitled_dashboard')}
    </BodyText>
  );

  if (createDashboardUrl) {
    return (
      <Anchor href={createDashboardUrl(id)} target="_blank">
        {renderText(colors.blue[500])}
      </Anchor>
    );
  }

  return renderText();
};

export default ConnectedDashboardItem;
