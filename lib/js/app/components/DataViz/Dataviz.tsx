import React, { useRef, useEffect, forwardRef } from 'react';
import { KeenDataviz } from '@keen.io/dataviz';

import { VisulizationContainer } from './DataViz.styles';

import { CONTAINER_ID } from './constants';

type Props = {
  /** Query execution results */
  analysisResults: Record<string, any>;
  /** Type of visualization */
  visualization: string;
};

const Dataviz = forwardRef<HTMLDivElement, Props>(
  ({ analysisResults, visualization }, containerRef) => {
    const datavizRef = useRef(null);

    useEffect(() => {
      if (datavizRef.current) datavizRef.current.destroy();
      datavizRef.current = new KeenDataviz({
        container: `#${CONTAINER_ID}`,
        type: visualization as any,
      }).render(analysisResults);
    }, [visualization, analysisResults, containerRef]);

    return (
      <div>
        <VisulizationContainer id={CONTAINER_ID} ref={containerRef} />
      </div>
    );
  }
);

Dataviz.displayName = 'Dataviz';

export default Dataviz;
