import React, { FC, useState, useMemo, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, Collections } from './EventCollection.styles';

import Title from '../Title';
import EmptySearch from '../EmptySearch';
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
  const [searchPhrase, setSearchPhrase] = useState(null);

  const containerRef = useRef(null);
  const activeItemRef = useRef(null);

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
    (searchResult, phrase) => {
      if (phrase) {
        setSearchPhrase(phrase);
        setCollectionsList(searchResult);
      } else {
        setCollectionsList(options);
      }
    }
  );

  useEffect(() => {
    if (isOpen) {
      if (activeItemRef.current) {
        const containerOffsetTop = containerRef.current.offsetTop;
        const { offsetTop, offsetHeight } = activeItemRef.current;

        containerRef.current.scrollTop =
          offsetTop - offsetHeight - containerOffsetTop;
      }
    } else {
      setCollectionsList(options);
      setSearchPhrase(null);
    }
  }, [isOpen]);

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
      <Title data-testid="event-collection-title" onClick={() => setOpen(true)}>
        {text.label}
      </Title>
      <DropableContainer
        variant={variant}
        searchPlaceholder={text.searchPlaceholder}
        placeholder={text.placeholder}
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        value={collection}
        searchable
        dropIndicator
        onSearch={searchHandler}
        onDefocus={() => {
          setOpen(false);
        }}
      >
        {collection}
      </DropableContainer>
      <Dropdown isOpen={isOpen}>
        {searchPhrase && !collectionsList.length ? (
          <EmptySearch message={text.emptySearchResults} />
        ) : (
          <Collections ref={containerRef}>
            <DropdownList
              ref={activeItemRef}
              items={collectionsList}
              setActiveItem={({ value }) => collection === value}
              onClick={(_e, { value }) => {
                onChange(value);
                setCollectionsList(options);
              }}
            />
          </Collections>
        )}
      </Dropdown>
    </Container>
  );
};

export default EventCollection;
