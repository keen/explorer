import React, { FC, useRef, useEffect } from 'react';

import { Container } from './DropdownListContainer.styles';

type Props = {
  /** Set scroll position on active element */
  scrollToActive: boolean;
  /** Set scroll position on active element */
  children: (activeItemRef: React.MutableRefObject<any>) => React.ReactNode;
  /** Maximum container height */
  maxHeight?: number;
};

const DropdownListContainer: FC<Props> = ({
  children,
  scrollToActive,
  maxHeight = 200,
}) => {
  const containerRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    if (scrollToActive && itemRef.current) {
      const containerOffsetTop = containerRef.current.offsetTop;
      const { offsetTop, offsetHeight } = itemRef.current;

      containerRef.current.scrollTop =
        offsetTop - offsetHeight - containerOffsetTop;
    }
  }, []);

  return (
    <Container ref={containerRef} style={{ maxHeight: `${maxHeight}px` }}>
      {children(itemRef)}
    </Container>
  );
};

export default DropdownListContainer;
