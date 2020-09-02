import React, {
  FC,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from '@keen.io/ui-core';

import { Container } from './EventCollection.styles';

import Title from '../Title';
import EmptySearch from '../EmptySearch';
import DropdownList from '../DropdownList';
import DropdownListContainer from '../DropdownListContainer';
import DropableContainer, { Variant } from '../DropableContainer';

import { useSearch } from '../../hooks';
import { getEventsCollections } from '../../modules/events';

import text from './text.json';

import { KEYBOARD_KEYS } from '../../constants';

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
  const [selectionIndex, setIndex] = useState<number>(null);

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

  const collectionListRef = useRef(collectionsList);
  const selectionIndexRef = useRef(selectionIndex);

  selectionIndexRef.current = selectionIndex;
  collectionListRef.current = collectionsList;

  const keyboardHandler = useCallback(
    (e: KeyboardEvent) => {
      const { current: optionsList } = collectionListRef;
      switch (e.keyCode) {
        case KEYBOARD_KEYS.ENTER:
          const { value } = optionsList[selectionIndexRef.current];
          onChange(value);
          setOpen(false);
          break;
        case KEYBOARD_KEYS.UP:
          if (selectionIndexRef.current === null) {
            setIndex(0);
          } else if (selectionIndexRef.current > 0) {
            setIndex(selectionIndexRef.current - 1);
          }
          break;
        case KEYBOARD_KEYS.DOWN:
          if (selectionIndexRef.current === null) {
            setIndex(0);
          } else if (selectionIndexRef.current < optionsList.length - 1) {
            setIndex(selectionIndexRef.current + 1);
          }
          break;
        case KEYBOARD_KEYS.ESCAPE:
          setOpen(false);
          break;
      }
    },
    [collectionsList]
  );

  const { searchHandler, searchPhrase, clearSearchPhrase } = useSearch<{
    label: string;
    value: string;
  }>(options, (searchResult, phrase) => {
    setIndex(null);
    if (phrase) {
      setCollectionsList(searchResult);
    } else {
      setCollectionsList(options);
    }
  });

  useEffect(() => {
    if (isOpen) {
      const index = options.findIndex(({ value }) => value === collection);
      setIndex(index);
      document.addEventListener('keydown', keyboardHandler);
    } else {
      setCollectionsList(options);
      clearSearchPhrase();
    }

    return () => {
      document.removeEventListener('keydown', keyboardHandler);
    };
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
          <DropdownListContainer scrollToActive maxHeight={240}>
            {(activeItemRef) => (
              <DropdownList
                ref={activeItemRef}
                items={collectionsList}
                setActiveItem={(_item, idx) => selectionIndex === idx}
                onClick={(_e, { value }) => {
                  onChange(value);
                  setCollectionsList(options);
                }}
              />
            )}
          </DropdownListContainer>
        )}
      </Dropdown>
    </Container>
  );
};

export default EventCollection;
