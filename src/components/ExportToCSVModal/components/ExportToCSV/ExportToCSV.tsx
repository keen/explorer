import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Anchor,
  Button,
  ModalFooter,
  ModalHeader,
  Tabs,
} from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { parseQuery } from '@keen.io/parser';
import { DataExport } from '@keen.io/data-export';
import { colors } from '@keen.io/colors';

import { dataExportActions } from '../../../../modules/dataExport';
import { getQueryResults } from '../../../../modules/queries';
import { Widget } from '../../../QueryVisualization/types';
import { exportToCsv } from '../../../../utils';
import { usePresentationTimezone } from '../../../../hooks/usePresentationTimezone';

import { Table } from '../Table';
import {
  FooterButtonsWrapper,
  ModalBody,
  TabDescription,
  TabsContainer,
} from './ExportToCSV.styles';
import { appSelectors } from '../../../../modules/app';

const ExportToCSV = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClose = () => dispatch(dataExportActions.showCSVExportModal(false));

  const TabOptions = [
    {
      label: t('export_csv.visualization_data_tab'),
      id: 'visualizationData',
    },
    {
      label: t('export_csv.raw_data_tab'),
      id: 'rawData',
    },
  ];

  const [activeTab, setActiveTab] = React.useState(TabOptions[0].id);

  const [rawData, setRawData] = useState([[]]);
  const [visualizationData, setVisualizationData] = useState([[]]);
  const [isEmptyResults, setEmptyResults] = useState(false);

  const queryResults = useSelector(getQueryResults);
  const { getPresentationTimezone } = usePresentationTimezone(queryResults);

  const { type: widgetType, chartSettings } = useSelector(
    appSelectors.getVisualization
  );

  useEffect(() => {
    if (queryResults) {
      if (activeTab === 'rawData') {
        const { data, keys } = parseQuery(queryResults);
        if (data.length === 0) {
          setEmptyResults(true);
        } else {
          setRawData(
            DataExport.exportRawData({ query: queryResults.query, keys, data })
          );
        }
      } else if (activeTab === 'visualizationData') {
        const { data, keys } = parseQuery(
          queryResults,
          widgetType,
          getPresentationTimezone(queryResults)
        );
        if (data.length === 0) {
          setEmptyResults(true);
        } else {
          setVisualizationData(
            DataExport.exportVisualizationData({
              query: queryResults.query,
              chartSettings: {
                ...chartSettings,
                data,
                keys,
              },
              widgetType: widgetType as Widget,
            })
          );
        }
      }
    }
  }, [activeTab]);

  const onExportToCSV = () => {
    if (activeTab === 'visualizationData') {
      exportToCsv({ data: visualizationData });
    } else if (activeTab === 'rawData') {
      exportToCsv({ data: rawData });
    }
    dispatch(dataExportActions.showCSVExportModal(false));
  };

  return (
    <>
      <ModalHeader onClose={onClose}>{t('export_csv.modal_title')}</ModalHeader>
      <ModalBody>
        <TabsContainer>
          <Tabs
            tabs={TabOptions}
            activeTab={activeTab}
            onClick={(id) => setActiveTab(id)}
            type="default"
          />
        </TabsContainer>
        {isEmptyResults && (
          <div>
            <TabDescription>
              <BodyText variant="body2" color={colors.black[100]}>
                {t('export_csv.empty_data')}
              </BodyText>
            </TabDescription>
          </div>
        )}
        {activeTab === 'visualizationData' && !isEmptyResults && (
          <div>
            <TabDescription>
              <BodyText variant="body2" color={colors.black[100]}>
                {widgetType !== 'json'
                  ? t('export_csv.visualization_data_info')
                  : t('export_csv.visualization_data_not_available_for_json')}
              </BodyText>
            </TabDescription>
            {widgetType !== 'json' && (
              <Table data={visualizationData} rowLimit={3} />
            )}
          </div>
        )}
        {activeTab === 'rawData' && !isEmptyResults && (
          <div>
            <TabDescription>
              <BodyText variant="body2" color={colors.black[100]}>
                {t('export_csv.raw_data_info')}
              </BodyText>
            </TabDescription>
            <Table data={rawData} rowLimit={3} />
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <FooterButtonsWrapper>
          <Button
            data-testid="export-csv"
            variant="secondary"
            style="solid"
            onClick={() => {
              onExportToCSV();
            }}
            isDisabled={
              isEmptyResults ||
              (widgetType === 'json' && activeTab === 'visualizationData')
            }
          >
            {t('export_csv.export_csv')}
          </Button>
          <Anchor
            onClick={onClose}
            style={{ cursor: 'pointer' }}
            color={colors.blue[500]}
            hoverColor={colors.blue[300]}
          >
            {t('export_csv.cancel')}
          </Anchor>
        </FooterButtonsWrapper>
      </ModalFooter>
    </>
  );
};

export default ExportToCSV;
