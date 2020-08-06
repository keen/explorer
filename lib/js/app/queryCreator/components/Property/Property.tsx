import React, { FC } from 'react';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import PropertyPath from '../PropertyPath';

import {
  Container,
  SearchIcon,
  Input,
  Placeholder,
  Content,
} from './Property.styles';

import { SEPARATOR } from './constants';

type Props = {
  /** Property in edit mode */
  editMode?: boolean;
  /** Property value */
  property?: string;
  /** Placeholder used when property is not provided */
  placeholder?: string;
  /** Initial search placeholder */
  searchPlaceholder?: string;
  /** Edit input change event handler  */
  onEditInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur event handler */
  onEditBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Property: FC<Props> = ({
  property,
  placeholder,
  searchPlaceholder,
  onEditInputChange,
  onEditBlur,
  editMode = false,
}) => {
  return (
    <Container>
      <Content>
        {placeholder && !property && !editMode && (
          <Placeholder>{placeholder}</Placeholder>
        )}
        {property && !editMode && (
          <PropertyPath path={property.split(SEPARATOR)} />
        )}
        {editMode && (
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
              data-testid="property-input"
              onBlur={(e) => onEditBlur && onEditBlur(e)}
              placeholder={property ? property : searchPlaceholder}
              defaultValue={property}
              onChange={(e) => onEditInputChange && onEditInputChange(e)}
            />
          </>
        )}
      </Content>
    </Container>
  );
};

export default Property;
