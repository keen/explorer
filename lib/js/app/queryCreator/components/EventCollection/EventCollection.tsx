import React, { FC, useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, Collections } from './EventCollection.styles';

import Dropdown from '../Dropdown';
import DropdownList from '../DropdownList';
import PropertyContainer from '../PropertyContainer';

import { useSearch } from '../../hooks';
import { getEventsCollections } from '../../modules/events';

import text from './text.json';

type Props = {
  /** Collection identifer */
  collection: string;
  /** Collection change event handler */
  onChange: (collection: string) => void;
  /** Reset event handler */
  onReset?: () => void;
};

const EventCollection: FC<Props> = ({ collection, onChange, onReset }) => {
  const [isOpen, setOpen] = useState(false);
  const collections = useSelector(getEventsCollections);
  const options = useMemo(
    () =>
      collections.map((name) => ({
        label: name,
        value: name,
      })),
    [collections]
  );

  const [collectionsList, setCollectionsList] = useState(options);

  const { searchHandler } = useSearch<{ label: string; value: string }>(
    options,
    (searchResult) => {
      setCollectionsList(searchResult);
    }
  );

  useEffect(() => {
    setCollectionsList(options);
  }, [options]);

  useEffect(() => {
    return () => {
      if (onReset) onReset();
    };
  }, []);

  return (
    <Container>
      <PropertyContainer
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        propertyLabel={text.label}
        value={collection}
        searchable
        onSearch={searchHandler}
        onDefocus={() => {
          setOpen(false);
        }}
      />
      <Dropdown isOpen={isOpen}>
        <Collections>
          <DropdownList
            items={collectionsList}
            onClick={(_e, { value }) => {
              onChange(value);
              setCollectionsList(options);
            }}
          />
        </Collections>
      </Dropdown>
    </Container>
  );
};

export default EventCollection;
