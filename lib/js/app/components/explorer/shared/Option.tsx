// @ts-nocheck
import React from 'react';

const Option = (props) => {
  // Fix https://github.com/JedWatson/react-select/issues/3128#issuecomment-439207355
  const { innerProps, isFocused, children } = props;
  const { onMouseMove, onMouseOver, ...newInnerProps } = innerProps;

  return (
    <div
      className="react-select-option"
      selected={isFocused}
      style={{}}
      {...newInnerProps}
    >
      {children}
    </div>
  );
};

export default Option;
