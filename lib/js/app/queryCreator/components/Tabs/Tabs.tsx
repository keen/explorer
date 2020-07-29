import React, { FC, useState, useCallback } from 'react';

import { TabsContainer, Tab, ActiveTab } from './tabs.styles';

import { TabTypes } from '../../types';

type Props = {
  /** Tabs configuration */
  tabs: string[];
  /** Active Tab */
  activeTab?: string;
  /** Size variant */
  type?: TabTypes;
  /** Click event handler */
  onClick?: (tabName: string) => void;
}


const Tabs: FC<Props> = ({
  tabs, activeTab, type = 'default', onClick
}) => {
  const initialState = {
    parentX: 0,
    x: 0,
    width: 0
  };

  const [state, setState] = useState(initialState);

  const activeTabMotion = {
    initial: initialState,
    animate: state,
    exit: { opacity: 0 },
    transition: { delay: 0.1, stiffness: 100 },
  };

  const { parentX } = state;

  const activeContainer = useCallback(node => {
    if (node !== null) {
      const { x } = node.getBoundingClientRect();
      setState(state => ({
        ...state,
        parentX: x
      }))
    }
  }, []);

  const activeTabRef = useCallback(node => {
    if (node !== null) {
      const { x, width } = node.getBoundingClientRect();
      setState(state => ({
        ...state,
        x: x - state.parentX,
        width
      }))
    }
  }, [parentX]);

  return (
    <TabsContainer ref={activeContainer} data-testid="tabs">
      {tabs.map((tab: string) => (
      <Tab data-testid="tab" type={type} key={tab} ref={tab === activeTab ? activeTabRef : null} onClick={() => onClick(tab)}>{tab}</Tab>
    ))}
      {activeTab && <ActiveTab {...activeTabMotion} />}
    </TabsContainer>
  )
}

export default Tabs;