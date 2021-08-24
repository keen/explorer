import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

import { ConnectedDashboard } from '../../../../modules/savedQuery';
import { AppContext } from '../../../../contexts';
import { List, ListItem, Anchor } from './DashboardsList.style';

type Props = {
  dashboards: ConnectedDashboard[];
};

const DashboardsList: FC<Props> = ({ dashboards }) => {
  const { createDashboardUrl } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <List>
      {dashboards.map(({ id, title }) => (
        <ListItem key={id}>
          {createDashboardUrl ? (
            <Anchor href={createDashboardUrl(id)}>
              <BodyText variant="body1" color={colors.blue[500]}>
                {title || t('update_saved_query.untitled_dashboard')}
              </BodyText>
            </Anchor>
          ) : (
            <BodyText variant="body1" color={colors.black[300]}>
              {title || t('update_saved_query.untitle_dashboard')}
            </BodyText>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default DashboardsList;
