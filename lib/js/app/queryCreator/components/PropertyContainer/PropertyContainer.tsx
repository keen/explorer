import React, { FC, useRef, useCallback, useEffect } from 'react';

import { Container, Input } from './PropertyContainer.styles';

type Props = {
  /** Active indicator */
  isActive: boolean;
  /** React children nodes */
  children: React.ReactNode;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Container defocus event handler */
  onDefocus: (e: MouseEvent) => void;
  /** Search feature flag */
  searchable?: boolean;
  /** Property value */
  value?: string;
  /** Search event handler */
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PropertyContainer: FC<Props> = ({
  onClick,
  value,
  children,
  isActive,
  onDefocus,
  onSearch,
  searchable,
}) => {
  const containerRef = useRef(null);
  const outsideClick = useCallback(
    (e) => {
      if (
        isActive &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        onDefocus(e);
      }
    },
    [isActive, containerRef]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [isActive, containerRef]);

  return (
    <Container
      data-testid="property-container"
      onClick={onClick}
      ref={containerRef}
    >
      {searchable && isActive ? (
        <Input type="text" autoFocus defaultValue={value} onChange={onSearch} />
      ) : (
        <div>{children}</div>
      )}
    </Container>
  );
};

export default PropertyContainer;
