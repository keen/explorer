import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@keen.io/icons';
import { FieldGroup } from '@keen.io/forms';
import { colors } from '@keen.io/colors';

import { PreviewCollections, PreviewLabel } from './QueryCreator.styles';

import { Analysis, EventCollection } from './components';
import { showField } from './utils/showField';

import {
  getAnalysis,
  getEventCollection,
  selectEventCollection,
  selectAnalysis,
} from '../../modules/queryCreator';

type Props = {
  /** Event collections */
  collections: string[];
  /** Preview collection event handler */
  onPreviewCollection?: (collection: string) => void;
};

const QueryCreator: FC<Props> = ({ collections, onPreviewCollection }) => {
  const dispatch = useDispatch();
  const analysis = useSelector(getAnalysis);
  const collection = useSelector(getEventCollection);

  return (
    <div>
      {showField('eventCollection', analysis) && (
        <FieldGroup data-test="event-collection">
          <EventCollection
            collection={collection}
            collections={collections}
            onChange={(collection) =>
              dispatch(selectEventCollection(collection))
            }
          />
          <PreviewCollections
            onClick={() =>
              onPreviewCollection && onPreviewCollection(collection)
            }
          >
            <Icon type="eye-solid" fill={colors.blue['500']} />
            <PreviewLabel>Preview Collections</PreviewLabel>
          </PreviewCollections>
        </FieldGroup>
      )}
      <Analysis
        analysis={analysis}
        onChange={(updatedAnalysis) =>
          dispatch(selectAnalysis(updatedAnalysis))
        }
      />
    </div>
  );
};

export default QueryCreator;
