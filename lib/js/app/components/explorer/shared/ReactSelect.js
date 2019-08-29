
import React from 'react';
import Select, { createFilter, components } from 'react-select';
import Option from './Option';

const Input = props => <components.Input {...props} autofill='off' />;

const ReactSelect = (props) => {
  if (props.options.length > 200) {
    return (
      <Select
        components={{
          Option,
          Input,
        }}
        filterOption={createFilter({ ignoreAccents: false })}
        {...props}
      />
    );
  }

  return (
    <Select
      {...props}
    />
  );
};

export default ReactSelect;
