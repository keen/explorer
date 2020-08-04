import React, { FC } from 'react';

import { Container, Message } from './EmptySearch.styles';

type Props = {
  /** Empty results message */
  message: string;
};

const EmptySearch: FC<Props> = ({ message }) => (
  <Container>
    <svg width="185" height="94" viewBox="0 0 185 94">
      <g fill="none" fillRule="evenodd">
        <circle cx="52" cy="73" r="10" fill="#4F5B5F" opacity=".1" />
        <circle cx="138" cy="62" r="11" fill="#85B4C3" opacity=".15" />
        <circle cx="59" cy="16" r="8" fill="#85B4C3" opacity=".15" />
        <circle cx="27.5" cy="36.5" r="16.5" fill="#85B4C3" opacity=".15" />
        <circle cx="126" cy="24" r="9" fill="#85B4C3" opacity=".15" />
        <circle cx="90" cy="89" r="5" fill="#85B4C3" opacity=".15" />
        <circle cx="11" cy="70" r="5" fill="#85B4C3" opacity=".15" />
        <circle cx="95" cy="5" r="5" fill="#4F5B5F" opacity=".1" />
        <circle cx="180" cy="62" r="5" fill="#85B4C3" opacity=".15" />
        <circle cx="5" cy="9" r="5" fill="#4F5B5F" opacity=".1" />
        <circle cx="162" cy="31" r="12" fill="#4F5B5F" opacity=".1" />
        <circle cx="94" cy="53" r="23" fill="#4F5B5F" opacity=".1" />
        <g
          fill="#27566D"
          fillRule="nonzero"
          opacity=".5"
          transform="translate(63 25)"
        >
          <path d="M24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 Z M24,5.33333333 C13.6906847,5.33333333 5.33333333,13.6906847 5.33333333,24 C5.33333333,34.3093153 13.6906847,42.6666667 24,42.6666667 C34.3093153,42.6666667 42.6666667,34.3093153 42.6666667,24 C42.6666667,13.6906847 34.3093153,5.33333333 24,5.33333333 Z" />
          <polygon points="42.846 38 59 54.154 54.154 59 38 42.846" />
        </g>
      </g>
    </svg>
    <Message>{message}</Message>
  </Container>
);

export default EmptySearch;
