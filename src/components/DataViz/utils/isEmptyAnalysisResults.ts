const isEmptyAnalysisResults = (analysisResults: Record<string, any>) =>
  analysisResults.result &&
  Array.isArray(analysisResults.result) &&
  analysisResults.result.length === 0;

export default isEmptyAnalysisResults;
