import React, { FC } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Wrapper, Container } from './Dropdown.styles';

type Props = {
  /** Open state indicator */
  isOpen: boolean;
  /** React children nodes */
  children: React.ReactNode;
};

const dropdownMotion = {
  initial: { opacity: 0, top: 20 },
  animate: { opacity: 1, top: 5 },
  exit: { opacity: 0, top: 30 },
};

const Dropdown: FC<Props> = ({ isOpen, children }) => (
  <Wrapper>
    <AnimatePresence>
      {isOpen && <Container {...dropdownMotion}>{children}</Container>}
    </AnimatePresence>
  </Wrapper>
);

export default Dropdown;
