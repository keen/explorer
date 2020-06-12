import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';

const accordionVariants = {
  open: { opacity: 1, height: 'auto' },
  collapsed: { opacity: 0, height: 0 },
};

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /** Header renderer */
  renderHeader: () => JSX.Element;
};

const Accordion: FC<Props> = ({ children, renderHeader }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header onClick={() => setIsOpen(!isOpen)}>{renderHeader()}</header>
      <motion.section
        initial={false}
        animate={isOpen ? 'open' : 'collapsed'}
        variants={accordionVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.section>
    </>
  );
};

export default Accordion;
