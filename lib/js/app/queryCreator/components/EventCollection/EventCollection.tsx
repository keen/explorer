import React, { FC, useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, Collections } from './EventCollection.styles';

import Title from '../Title';
import Dropdown from '../Dropdown';
import DropdownList from '../DropdownList';
import DropableContainer, { Variant } from '../DropableContainer';

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
  /** Container variant */
  variant?: Variant;
};

const EventCollection: FC<Props> = ({
  collection,
  onChange,
  onReset,
  variant = 'primary',
}) => {
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
      <Title>{text.label}</Title>
      <DropableContainer
        variant={variant}
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        value={collection}
        searchable
        onSearch={searchHandler}
        onDefocus={() => {
          setOpen(false);
        }}
      >
        {collection}
      </DropableContainer>
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
