import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { DropdownMenu } from '@keen.io/ui-core';

import { Container, DeleteQueryItem } from './ActionsMenu.styles';
import text from './text.json';

import { shareQueryUrl } from '../../modules/app';

type Props = {
  /** Is new query */
  isNewQuery: boolean;
  /** Remove query event handler */
  onRemoveQuery: () => void;
  /** Share query event handler */
  onShareQuery?: () => void;
};

const ActionsMenu: FC<Props> = ({
  isNewQuery,
  onShareQuery,
  onRemoveQuery,
}) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <DropdownMenu.Container>
        {!isNewQuery && (
          <DropdownMenu.Item onClick={onRemoveQuery}>
            <DeleteQueryItem>{text.deleteQuery}</DeleteQueryItem>
          </DropdownMenu.Item>
        )}
        <DropdownMenu.Divider />
        <DropdownMenu.Item
          onClick={() => {
            onShareQuery && onShareQuery();
            dispatch(shareQueryUrl());
          }}
        >
          {text.shareQuery}
        </DropdownMenu.Item>
      </DropdownMenu.Container>
    </Container>
  );
};

export default ActionsMenu;
