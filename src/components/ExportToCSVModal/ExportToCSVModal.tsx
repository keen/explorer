import React, { FC, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';

import {
  Anchor,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  Portal,
  Tabs,
} from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

import {
  dataExportActions,
  dataExportSelectors,
} from '../../modules/dataExport';
import { AppContext } from '../../contexts';

import {
  ModalBody,
  FooterButtonsWrapper,
  TabDescription,
} from './ExportToCSVModal.styles';
import { Table } from './components/Table';

const ExportToCSVModal: FC = () => {
  const dispatch = useDispatch();
  const { modalContainer } = useContext(AppContext);
  const isOpen = useSelector(dataExportSelectors.getExportToCSVModalVisibility);
  const { t } = useTranslation();
  const onClose = () => dispatch(dataExportActions.showCSVExportModal(false));

  const TabOptions = [
    {
      label: t('export_CSV.tabs.visualization_data'),
      id: 'visualizationData',
    },
    {
      label: t('export_CSV.tabs.raw_data'),
      id: 'rawData',
    },
  ];

  const [activeTab, setActiveTab] = React.useState(TabOptions[0].id);

  // todo - get real data
  const data = [
    ['author_book', 'value', 'percentage value'],
    ['Edwidge Danticat | Love, Anger, Madness', 97, '11.6%'],
    ['George R. R. Martin | Game of Thrones', 730, '87.6%'],
    ['Stephen King | The Shining', 6, '0.7%'],
  ];

  return (
    <Portal modalContainer={modalContainer}>
      <Modal isOpen={isOpen} onClose={onClose}>
        {() => (
          <>
            <ModalHeader onClose={onClose}>
              {t('export_CSV.modal_title')}
            </ModalHeader>
            <ModalBody>
              <Tabs
                tabs={TabOptions}
                activeTab={activeTab}
                onClick={(id) => setActiveTab(id)}
                type="default"
              />
              {activeTab === 'visualizationData' && (
                <div>
                  <TabDescription>
                    <BodyText
                      variant="body2"
                      color={transparentize(0.5, colors.black[100])}
                    >
                      {t('export_CSV.visualization_data_info')}
                    </BodyText>
                  </TabDescription>
                  <Table data={data} columnLimit={3} rowLimit={3} />
                </div>
              )}
              {activeTab === 'rawData' && (
                <div>
                  <TabDescription>
                    <BodyText
                      variant="body2"
                      color={transparentize(0.5, colors.black[100])}
                    >
                      {t('export_CSV.raw_data_info')}
                    </BodyText>
                  </TabDescription>
                  <Table data={data} columnLimit={3} rowLimit={3} />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <FooterButtonsWrapper>
                <Button
                  data-testid="save-query"
                  variant="secondary"
                  style="solid"
                  onClick={() => {
                    onClose();
                  }}
                >
                  {t('export_CSV.export_csv')}
                </Button>
                <Anchor
                  onClick={onClose}
                  color={colors.blue[500]}
                  hoverColor={colors.blue[300]}
                >
                  {t('export_CSV.cancel')}
                </Anchor>
              </FooterButtonsWrapper>
            </ModalFooter>
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default ExportToCSVModal;
