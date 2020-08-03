import React, { FC } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Wrapper, Container } from './Dropdown.styles';

type Props = {
  /** Open state indicator */
  isOpen: boolean;
  /** React children nodes */
  children: React.ReactNode;
  /** Expand container to full width */
  fullWidth?: boolean;
};

const dropdownMotion = {
  initial: { opacity: 0, top: 20 },
  animate: { opacity: 1, top: 2 },
  exit: { opacity: 0, top: 30 },
};

const Dropdown: FC<Props> = ({ isOpen, children, fullWidth = true }) => (
  <Wrapper>
    <AnimatePresence>
      {isOpen && (
        <Container {...dropdownMotion} fullWidth={fullWidth}>
          {children}
        </Container>
      )}
    </AnimatePresence>
  </Wrapper>
);

export default Dropdown;
