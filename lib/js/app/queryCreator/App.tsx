import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ModifiersSettings, ModifiersItem, LimitContainer } from './App.styles';

import {
  QueryArguments,
  Card,
  Extraction,
  GroupBy,
  OrderBy,
  Interval,
  Limit,
  FunnelSteps,
} from './components';

import Filters from './components/Filters';

import { showField } from './utils/showField';

import {
  getEventCollection,
  getAnalysis,
  getFilters,
  removeFilter,
  addFilter,
  setFilters,
  updateFilter,
} from './modules/query';

import { Filter } from './types';

type Props = {
  /** Preview collection event handler */
  onPreviewCollection?: (collection: string) => void;
};

const App: FC<Props> = () => {
  const dispatch = useDispatch();
  const analysis = useSelector(getAnalysis);
  const collection = useSelector(getEventCollection);

  const filters = useSelector(getFilters);

  const modifiersItemSettings = {
    marginBottom: { xs: 20, md: 0 },
    marginRight: { xs: 0, md: 25 },
    width: { xs: '100%', md: 'auto' },
  };

  return (
    <div>
      <QueryArguments />
      {showField('filters', analysis) && (
        <Card>
          <Filters
            collection={collection}
            filters={filters}
            onReset={() => dispatch(setFilters([]))}
            onRemove={(idx: number) => dispatch(removeFilter(idx))}
            onChange={(idx: number, filter: Filter) =>
              dispatch(updateFilter(idx, filter))
            }
            onClick={(idx: string) => dispatch(addFilter(idx))}
          />
        </Card>
      )}
      {showField('steps', analysis) && <FunnelSteps />}
      {!showField('steps', analysis) && (
        <Card>
          <ModifiersSettings flexDirection={{ xs: 'column', md: 'row' }}>
            {showField('groupBy', analysis) && (
              <ModifiersItem {...modifiersItemSettings}>
                <GroupBy collection={collection} />
              </ModifiersItem>
            )}
            {showField('orderBy', analysis) && (
              <ModifiersItem {...modifiersItemSettings}>
                <OrderBy collection={collection} />
              </ModifiersItem>
            )}
            {showField('limit', analysis) && (
              <LimitContainer>
                <Limit />
              </LimitContainer>
            )}
          </ModifiersSettings>
          {showField('interval', analysis) && <Interval />}
        </Card>
      )}

      {analysis === 'extraction' && <Extraction collection={collection} />}
    </div>
  );
};

export default App;
