import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import { ListItem } from './components';
import { Container, List, Groups, AnalysisTitle } from './Analysis.styles';

import Title from '../Title';
import Dropdown from '../Dropdown';
import DropableContainer from '../DropableContainer';

import text from './text.json';
import { transformName } from './utils';

import { Analysis as AnalysisType } from '../../../types';

import { ANALYSIS_GROUPS } from './constants';
import { KEYBOARD_KEYS } from '../../constants';

type Props = {
  /** Current analysis */
  analysis: AnalysisType;
  /** Analysis change handler */
  onChange: (analysis: AnalysisType) => void;
};

const Analysis: FC<Props> = ({ analysis, onChange }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectionIndex, setIndex] = useState<number>(null);
  const options = useMemo(
    () => ANALYSIS_GROUPS.reduce((acc, val) => acc.concat(val), []),
    []
  );

  const indexRef = useRef(selectionIndex);
  indexRef.current = selectionIndex;

  const keyboardHandler = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.keyCode) {
      case KEYBOARD_KEYS.ENTER:
        const { value } = options.find(
          ({ index }) => index === indexRef.current
        );
        onChange(value);
        setOpen(false);
        break;
      case KEYBOARD_KEYS.UP:
        if (indexRef.current > 0) {
          setIndex(indexRef.current - 1);
        }
        break;
      case KEYBOARD_KEYS.DOWN:
        if (indexRef.current < options.length - 1) {
          setIndex(indexRef.current + 1);
        }
        break;
      case KEYBOARD_KEYS.ESCAPE:
        setOpen(false);
        break;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const { index } = options.find(({ value }) => value === analysis);
      setIndex(index);
      document.addEventListener('keydown', keyboardHandler);
    }

    return () => document.removeEventListener('onkeydown', keyboardHandler);
  }, [isOpen]);

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
              {options.map(({ label, value, index, description }) => (
                <ListItem
                  key={value}
                  isActive={selectionIndex === index}
                  description={description}
                  analysis={value}
                  onMouseEnter={() => setIndex(index)}
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
