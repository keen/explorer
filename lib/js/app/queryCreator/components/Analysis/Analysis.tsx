import React, { FC, useMemo, useCallback, useState, useRef } from 'react';
import Fuse from 'fuse.js';

import Item from './Item';
import { Container, List } from './Analysis.styles';

import Label from '../Label';
import Dropdown from '../Dropdown';
import PropertyContainer from '../PropertyContainer';

import text from './text.json';
import { createOptions } from './utils';

import { Analysis as AnalysisType } from '../../../types';

type Props = {
  /** Current analysis */
  analysis: AnalysisType;
  /** Analysis change handler */
  onChange: (analysis: AnalysisType) => void;
};

const Analysis: FC<Props> = ({ analysis, onChange }) => {
  const [isOpen, setOpen] = useState(false);
  const options = useMemo(() => createOptions(), []);
  const [analysisList, setAnalysisList] = useState(options);

  const fuseSearch = useRef(
    new Fuse(options, {
      keys: ['label', 'value'],
      threshold: 0.3,
    })
  );

  const searchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      const results = fuseSearch.current.search(value).map(({ item }) => item);

      setAnalysisList(results);
    },
    [fuseSearch]
  );

  return (
    <Container>
      <Label>{text.label}</Label>
      <PropertyContainer
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        value={analysis}
        onSearch={searchHandler}
        searchable
        onDefocus={() => {
          setOpen(false);
          setAnalysisList(options);
        }}
      >
        {analysis}
      </PropertyContainer>
      <Dropdown isOpen={isOpen}>
        <List>
          {analysisList.map(({ label, value }) => (
            <Item
              key={value}
              analysis={value}
              onClick={(_e, analysis) => {
                setOpen(false);
                onChange(analysis);
              }}
            >
              {label}
            </Item>
          ))}
        </List>
      </Dropdown>
    </Container>
  );
};

export default Analysis;
