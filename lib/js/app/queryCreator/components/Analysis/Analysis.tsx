import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Dropdown, ScrollWrapper, Tooltip } from '@keen.io/ui-core';

import { ListItem } from './components';
import {
  Container,
  List,
  Groups,
  AnalysisTitle,
  TooltipContainer,
} from './Analysis.styles';

import Title from '../Title';
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

const hintMotion = {
  initial: { opacity: 0, right: -10 },
  animate: { opacity: 1, right: 0 },
  exit: { opacity: 0 },
};

const Analysis: FC<Props> = ({ analysis, onChange }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectionIndex, setIndex] = useState<number>(null);
  const [hint, showHint] = useState(false);
  const [tooltip, setTooltip] = useState({
    top: 0,
    bottom: 0,
    height: 0,
    overflow: false,
  });
  const options = useMemo(
    () => ANALYSIS_GROUPS.reduce((acc, val) => acc.concat(val), []),
    []
  );

  const tooltipRef = useRef(null);
  const dropdownRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (
      dropdownRef.current &&
      hint &&
      tooltipRef.current &&
      scrollRef.current
    ) {
      const { clientHeight: height } = tooltipRef.current;
      const { top, bottom } = dropdownRef.current.getBoundingClientRect();
      const scrollTop = scrollRef.current.offsetParent
        ? scrollRef.current.offsetParent.scrollTop
        : 0;
      setTooltip((state) => {
        const tooltipBottom = top + state.top + height;
        const overflow = bottom + scrollTop < tooltipBottom;
        return {
          ...state,
          overflow,
          height,
          top: state.top - scrollTop,
          bottom: state.bottom - scrollTop,
        };
      });
    }
  }, [tooltipRef, dropdownRef, scrollRef, hint]);

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

    return () => {
      document.removeEventListener('keydown', keyboardHandler);
    };
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
      <Dropdown ref={dropdownRef} isOpen={isOpen}>
        <ScrollWrapper>
          <Groups ref={scrollRef}>
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
                    showHint={(value, topPos, bottomPos) => {
                      if (topPos !== 0 && bottomPos !== 0 && value) {
                        setTooltip((state) => ({
                          ...state,
                          top: topPos,
                          bottom: bottomPos,
                        }));
                      }
                      showHint(value);
                    }}
                  >
                    {label}
                  </ListItem>
                ))}
              </List>
            ))}
          </Groups>
        </ScrollWrapper>
        {hint && (
          <TooltipContainer
            ref={tooltipRef}
            data-testid="hint-message"
            key="tooltip-container"
            {...hintMotion}
            tooltipY={
              tooltip.overflow ? tooltip.bottom - tooltip.height : tooltip.top
            }
          >
            <Tooltip mode="dark" hasArrow={false}>
              <div
                dangerouslySetInnerHTML={{
                  __html: options[selectionIndex].description,
                }}
              />
            </Tooltip>
          </TooltipContainer>
        )}
      </Dropdown>
    </Container>
  );
};

export default Analysis;
