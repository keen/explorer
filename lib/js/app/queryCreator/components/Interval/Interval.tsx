import React, { FC, useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionButton } from '@keen.io/ui-core';

import Title from '../Title';
import Tabs from '../Tabs';
import Dropdown from '../Dropdown';
import DropableContainer from '../DropableContainer';
import SupportedInterval from '../SupportedInterval';
import CustomInterval from '../CustomInterval';

import { isCustomInterval } from './utils/isCustomInterval';
import { transformInterval } from './utils/transformInterval';
import text from './text.json';
import { Container, IntervalContainer, DropdownContainer } from './Interval.styles';

import { getInterval, setInterval } from '../../modules/query';

import {
  STANDARD_TAB,
  CUSTOM_TAB,
  TABS_SETTINGS,
  DEFAULT_STANDARD_INTERVAL,
  DEFAULT_CUSTOM_INTERVAL,
} from './constants';

type Props = {};

const Interval: FC<Props> = () => {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef(null);

  const dispatch = useDispatch();
  const interval = useSelector(getInterval);

  const customInterval = isCustomInterval(interval);

  const changeHandler = useCallback(
    (interval) => dispatch(setInterval(interval)),
    []
  );

  useEffect(() => {
    return () => dispatch(setInterval(undefined));
  }, []);

  return (
    <Container ref={containerRef}>
      <Title onClick={() => !isOpen && setOpen(true)}>{text.label}</Title>
      <IntervalContainer>
        <DropableContainer 
          variant="secondary"
          placeholder="Set interval"
          onClick={() => !isOpen && setOpen(true)}
          isActive={isOpen}
          value={interval}
          onDefocus={(event: any) => {
            if (
              !event.path?.includes(containerRef.current)
            ) {
              setOpen(false);
            }
          }}
        >
          {interval && transformInterval(interval)}
        </DropableContainer>
        {interval && <ActionButton
          action="remove"
          onClick={() => dispatch(setInterval(undefined))}
        />}
      </IntervalContainer>
      <Dropdown isOpen={isOpen}>
        <Tabs
          activeTab={customInterval ? CUSTOM_TAB : STANDARD_TAB}
          onClick={(tabId) => {
            tabId === STANDARD_TAB
              ? dispatch(setInterval(DEFAULT_STANDARD_INTERVAL))
              : dispatch(setInterval(DEFAULT_CUSTOM_INTERVAL));
          }}
          tabs={TABS_SETTINGS}
        />
        <DropdownContainer>
          {customInterval ? (
            <CustomInterval interval={interval} onChange={changeHandler} />
          ) : (
            <SupportedInterval interval={interval} onChange={(interval) => {changeHandler(interval); setOpen(false);}} />
          )}
        </DropdownContainer>
      </Dropdown>
    </Container>
  );
};

export default Interval;
