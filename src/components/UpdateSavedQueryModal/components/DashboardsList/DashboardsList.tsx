import React, { FC, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import { Portal, Modal, ModalHeader, ModalFooter, Button, Anchor } from '@keen.io/ui-core';

// import QuerySettings from '../QuerySettings';

// import {
// getQuerySettingsModalVisibility,
// getUpdateSavedQueryModalVisibility,
// hideQuerySettingsModal,
// hideUpdateSavedQueryModal,
// } from '../../modules/app';
// import { queriesActions } from '../../modules/queries';

// import { AppContext } from '../../contexts';
// import {
//   savedQueryActions,
//   savedQuerySelectors,
// } from '../../modules/savedQuery';

// import { FooterContent, Content, Cancel } from './UpdateSavedQueryModal.style';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';
import { ConnectedDashboard } from '../../../../modules/savedQuery';
import { List, ListItem, Anchor } from './DashboardsList.style';
import { AppContext } from '../../../../contexts';
import { useTranslation } from 'react-i18next';

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
                {title || t('update_saved_query.untitle_dashboard')}
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
