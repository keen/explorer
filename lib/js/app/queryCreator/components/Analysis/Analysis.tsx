import React, { FC, useState } from 'react';

import { ListItem } from './components';
import { Container, List, Groups, AnalysisTitle } from './Analysis.styles';

import Title from '../Title';
import Dropdown from '../Dropdown';
import DropableContainer from '../DropableContainer';

import text from './text.json';
import { transformName } from './utils';

import { Analysis as AnalysisType } from '../../../types';

import { ANALYSIS_GROUPS } from './constants';

type Props = {
  /** Current analysis */
  analysis: AnalysisType;
  /** Analysis change handler */
  onChange: (analysis: AnalysisType) => void;
};

const Analysis: FC<Props> = ({ analysis, onChange }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Container>
      <Title onClick={() => setOpen(true)}>{text.label}</Title>
      <DropableContainer
        onClick={() => !isOpen && setOpen(true)}
        placeholder={text.placeholder}
        isActive={isOpen}
        value={analysis}
        onDefocus={() => {
          setOpen(false);
        }}
      >
        <AnalysisTitle>{transformName(analysis)}</AnalysisTitle>
      </DropableContainer>
      <Dropdown isOpen={isOpen}>
        <Groups>
          {ANALYSIS_GROUPS.map((options, idx) => (
            <List key={idx}>
              {options.map(({ label, value, description }) => (
                <ListItem
                  key={value}
                  isActive={analysis === value}
                  description={description}
                  analysis={value}
                  onClick={(_e, analysis) => {
                    setOpen(false);
                    onChange(analysis);
                  }}
                >
                  {label}
                </ListItem>
              ))}
            </List>
          ))}
        </Groups>
      </Dropdown>
    </Container>
  );
};

export default Analysis;
