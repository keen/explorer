import React, { FC, useRef, useEffect } from 'react';
import { KeenDataviz } from '@keen.io/dataviz';

import { VisulizationContainer } from './DataViz.styles';

type Props = {
  /** Query execution results */
  analysisResults: Object;
  /** Type of visualization */
  visualization: string;
};

const Dataviz: FC<Props> = ({ analysisResults, visualization }) => {
  const container = useRef(null);
  const datavizRef = useRef(null);

  useEffect(() => {
    if (datavizRef.current) datavizRef.current.destroy();

    datavizRef.current = new KeenDataviz({
      container: container.current,
      type: visualization as any,
    }).render(analysisResults);
  }, [visualization, analysisResults]);

  return (
    <div>
      <VisulizationContainer ref={container} />
      dataviz
    </div>
  );
};

export default Dataviz;
