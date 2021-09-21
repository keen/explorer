import React, { FC } from 'react';
import { Analysis } from '@keen.io/query';
import { BodyText } from '@keen.io/typography';
import { transformName } from '../../utils';

type AnalysisItem = {
  analysis_type: Analysis;
  target_property?: string;
};

type Props = {
  analyses: Record<string, AnalysisItem>;
};

const Analyses: FC<Props> = ({ analyses }) => (
  <>
    {Object.keys(analyses).map((key) => (
      <BodyText variant="body2" key={key}>
        {transformName(analyses[key].analysis_type)}
        {analyses[key].target_property && `: ${analyses[key].target_property}`}
      </BodyText>
    ))}
  </>
);

export default Analyses;
