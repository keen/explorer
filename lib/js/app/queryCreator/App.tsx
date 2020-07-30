import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FieldGroup } from '@keen.io/forms';

import {
  QueryArguments,
  Accordion,
  Card,
  Extraction,
  GroupBy,
  OrderBy,
  Interval,
  Limit,
  Percentile,
  FunnelSteps,
  FiltersContainer,
  InputGroup,
  Group,
} from './components';
import { showField } from './utils/showField';

import {
  getPercentile,
  getEventCollection,
  getAnalysis,
  getFilters,
  setFilters,
  setPercentile,
} from './modules/query';

type Props = {
  /** Preview collection event handler */
  onPreviewCollection?: (collection: string) => void;
};

const App: FC<Props> = () => {
  const dispatch = useDispatch();
  const analysis = useSelector(getAnalysis);
  const collection = useSelector(getEventCollection);
  const percentile = useSelector(getPercentile);

  const filters = useSelector(getFilters);

  return (
    <div>
      <QueryArguments />
      <Card>
        {showField('steps', analysis) && <FunnelSteps />}
        {showField('groupBy', analysis) && <GroupBy collection={collection} />}
        {showField('orderBy', analysis) && <OrderBy />}
        {showField('interval', analysis) && <Interval />}
        {showField('limit', analysis) && <Limit />}
        {/* <InputGroup>
          <Group>input</Group>
          <Group>select</Group>
          <Group>button</Group>
          <Group>button</Group>
          <Group>button</Group>
          <Group>button</Group>
          <Group>button</Group>
        </InputGroup> */}
      </Card>

      {analysis === 'extraction' && <Extraction collection={collection} />}

      {showField('percentile', analysis) && (
        <FieldGroup>
          <Percentile
            value={percentile}
            onReset={() => dispatch(setPercentile(null))}
            onChange={(value) => dispatch(setPercentile(value))}
          />
        </FieldGroup>
      )}

      {showField('filters', analysis) && (
        <Accordion renderHeader={() => <div>Filters</div>}>
          <FiltersContainer
            collection={collection}
            filters={filters}
            onChange={(filters) => dispatch(setFilters(filters))}
          />
        </Accordion>
      )}
    </div>
  );
};

export default App;
