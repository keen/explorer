import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@keen.io/ui-core';

import { Container } from './SectionTabs.styles';

import { EditorSection } from '../../../../modules/editor';

type Props = {
  /** Current active section */
  activeSection?: EditorSection;
  /** Change editor section event handler */
  onChangeSection: (sectionId: EditorSection) => void;
};

const SectionTabs: FC<Props> = ({ activeSection, onChangeSection }) => {
  const { t } = useTranslation();

  const tabs = [
    {
      label: t('editor.query_section'),
      id: EditorSection.QUERY,
    },
    {
      label: t('editor.settings_section'),
      id: EditorSection.SETTINGS,
    },
  ];

  return (
    <Container>
      <Tabs
        tabs={tabs}
        activeTab={activeSection}
        onClick={(sectionId: EditorSection) => onChangeSection(sectionId)}
      />
    </Container>
  );
};

export default SectionTabs;
