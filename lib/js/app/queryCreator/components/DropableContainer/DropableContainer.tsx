import React, { FC, useRef, useCallback, useEffect } from 'react';
import { transparentize } from 'polished';

import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import {
  Container,
  Placeholder,
  SearchIcon,
  DropIndicator,
  Input,
} from './DropableContainer.styles';
import { Variant } from './types';

type Props = {
  /** Active indicator */
  isActive: boolean;
  /** React children nodes */
  children: React.ReactNode;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Container defocus event handler */
  onDefocus: (e: MouseEvent) => void;
  /** Component variant */
  variant?: Variant;
  /** Search feature flag */
  searchable?: boolean;
  /** Shows drop indicator */
  dropIndicator?: boolean;
  /** Property value */
  value?: string | Record<string, any>;
  /** Value placeholder */
  placeholder?: string;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Search event handler */
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Error */
  hasError?: boolean;
};

const DropableContainer: FC<Props> = ({
  onClick,
  value,
  placeholder,
  children,
  isActive,
  onDefocus,
  onSearch,
  searchable,
  searchPlaceholder,
  dropIndicator,
  variant = 'primary',
  hasError = false,
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
      data-testid="dropable-container"
      isActive={isActive}
      variant={variant}
      hasError={hasError}
      onClick={onClick}
      ref={containerRef}
    >
      {searchable && isActive ? (
        <>
          <SearchIcon>
            <Icon
              type="search"
              fill={transparentize(0.3, colors.blue[500])}
              width={15}
              height={15}
            />
          </SearchIcon>
          <Input
            type="text"
            autoFocus
            data-testid="dropable-container-input"
            placeholder={typeof value === 'string' ? value : searchPlaceholder}
            onChange={onSearch}
          />
        </>
      ) : (
        <>
          {value && <>{children}</>}
          {placeholder && !value && <Placeholder>{placeholder}</Placeholder>}
        </>
      )}
      {dropIndicator && (
        <DropIndicator data-testid="drop-indicator">
          <Icon
            type="caret-down"
            fill={transparentize(0.3, colors.blue[500])}
            width={10}
            height={10}
          />
        </DropIndicator>
      )}
    </Container>
  );
};

export default DropableContainer;
