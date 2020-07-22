import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPubSub } from '@keen.io/pubsub';
import { Button } from '@keen.io/ui-core';

import { Container, Menu, MenuItem } from './EditorNavigation.styles';
import text from './text.json';

import ShareQuery from '../ShareQuery';
import APIResource from '../APIResource';
import { getSavedQuery } from '../../modules/savedQuery';
import { copyShareUrl } from '../../modules/app';

import { copyToClipboard } from '../../utils';

import { NEW_QUERY_EVENT } from '../../queryCreator';

type Props = {
  /** Query definition */
  query: Object;
};

const EditorNavigation: FC<Props> = ({ query }) => {
  const dispatch = useDispatch();
  const savedQuery = useSelector(getSavedQuery);

  return (
    <Container>
      <div>test</div>
      <Menu>
        <MenuItem>
          <Button
            style="outline"
            variant="success"
            onClick={() => {
              const pubsub = getPubSub();
              pubsub.publish(NEW_QUERY_EVENT);
            }}
          >
            {text.newQueryButton}
          </Button>
        </MenuItem>
        <MenuItem>
          <APIResource
            onClick={(resourceUrl) => copyToClipboard(resourceUrl)}
            query={query}
          />
        </MenuItem>
        <MenuItem>
          <ShareQuery
            onClick={() => dispatch(copyShareUrl(query, savedQuery))}
          />
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default EditorNavigation;
