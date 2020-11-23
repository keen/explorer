import isEmptyAnalysisResults from './isEmptyAnalysisResults';

test('returns "false" for numeric analysis results', () => {
  const analysisResults = {
    result: 0,
  };

  expect(isEmptyAnalysisResults(analysisResults)).toBeFalsy();
});

test('returns "true" for analysis results with empty collection', () => {
  const analysisResults = {
    result: [],
  };

  expect(isEmptyAnalysisResults(analysisResults)).toBeTruthy();
});
