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
} from '@keen.io/ui-core';

// import QuerySettings from '../QuerySettings';

import {
  // getQuerySettingsModalVisibility,
  getUpdateSavedQueryModalVisibility,
  // hideQuerySettingsModal,
  hideUpdateSavedQueryModal,
} from '../../modules/app';
// import { queriesActions } from '../../modules/queries';

import { AppContext } from '../../contexts';
// import {
//   savedQueryActions,
//   savedQuerySelectors,
// } from '../../modules/savedQuery';

import { FooterContent, Content, Cancel } from './UpdateSavedQueryModal.style';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';
import { DashboardsList } from './components';
import { queriesActions } from '../../modules/queries';
import { savedQuerySelectors } from '../../modules/savedQuery';

// type Props = {
//   /** Save query event handler */
//   onSaveQuery: (settings: {
//     displayName: string;
//     name: string;
//     refreshRate: number;
//     tags: string[];
//   }) => void;
//   /** Cache available indicator */
//   cacheAvailable: boolean;
// };

const UpdateSavedQueryModal: FC = () => {
  const dispatch = useDispatch();
  const { modalContainer } = useContext(AppContext);
  // const { t } = useTranslation(null, { useSuspense: false });
  const { t } = useTranslation();
  const [inViewRef, inView] = useInView();

  const isOpen = useSelector(getUpdateSavedQueryModalVisibility);
  // const isConntectedDashboardsLoading = useSelector(
  //   savedQuerySelectors.getConnectedDashboardsLoading
  // );
  const isConntectedDashboardsError = useSelector(
    savedQuerySelectors.getConnectedDashboardsError
  );
  const connectedDashboards = useSelector(
    savedQuerySelectors.getConnectedDashboards
  );
  // const { exists, isCloned } = useSelector(savedQuerySelectors.getSavedQuery);
  const onClose = () => dispatch(hideUpdateSavedQueryModal());

  // const closeHandler = useCallback(() => {
  //   dispatch(hideQuerySettingsModal());
  //   dispatch(queriesActions.resetSavedQueryError());
  //   if (!exists && !isCloned) {
  //     dispatch(savedQueryActions.resetSavedQuery());
  //   }
  // }, [exists, isCloned]);

  // const dashboards = [
  //   {id:'1', title: 'Dashboard'},
  //   {id:'2', title: 'Dashboard'},
  //   {id:'3', title: 'Dashboard'},
  //   {id:'4', title: 'Dashboard'},
  //   {id:'5', title: 'Dashboard'},
  //   {id:'6', title: 'Dashboard'},
  //   {id:'7', title: 'Dashboard'},
  //   {id:'8', title: 'Dashboard'},
  //   {id:'9', title: 'Dashboard'},
  //   {id:'10', title: 'Dashboard'},
  // ]

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
              {isConntectedDashboardsError && (
                <BodyText variant="body1" color={colors.red[500]}>
                  {t('update_saved_query.dashboard_connection_error')}
                </BodyText>
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
                {/* <Button
                  data-testid="save-query"
                  variant="secondary"
                  style="solid"
                  isDisabled={isSavingQuery}
                  icon={isSavingQuery && <FadeLoader />}
                  onClick={() => {
                    const { name, displayName, refreshRate, tags } = querySettings;
                    if (displayName) {
                      const validateNameUniqueness = hasNameChanged;
                      if (
                        validateNameUniqueness &&
                        savedQueries.find((query) => query.name === name)
                      ) {
                        setQueryNameError(
                          t('query_settings.query_unique_name_error') as string
                        );
                      } else {
                        onSave({ name, displayName, refreshRate, tags });
                      }
                    } else {
                      setQueryNameError(
                        t('query_settings.query_name_error') as string
                      );
                    }
                  }}
                >
                  {isSavingQuery
                    ? t('query_settings.saving_query')
                    : t('query_settings.save_query_button')}
                </Button> */}
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
