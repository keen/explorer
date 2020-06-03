import React, { FC, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from '@keen.io/ui-core';

import { getTimezoneValue } from './utils/getTimezoneValue';
import { TIMEZONES } from './constants';

import text from './text.json';

import { getTimezone, selectTimezone } from '../../modules/query';
import { Timezones } from '../../types';

const Timezone: FC<{}> = () => {
  const dispatch = useDispatch();
  const timezone = useSelector(getTimezone);

  useEffect(() => {
    return () => dispatch(selectTimezone(undefined));
  }, []);

  const options = useMemo(
    () =>
      TIMEZONES.map(({ name }) => ({
        label: name,
        value: name,
      })),
    []
  );

  const timezoneValue = getTimezoneValue(timezone);

  return (
    <>
      <Select
        variant="solid"
        placeholder={text.placeholder}
        onChange={({ value }: { value: Timezones }) =>
          dispatch(selectTimezone(value))
        }
        value={
          timezoneValue ? { label: timezoneValue, value: timezoneValue } : null
        }
        options={options}
      />
    </>
  );
};

export default Timezone;
