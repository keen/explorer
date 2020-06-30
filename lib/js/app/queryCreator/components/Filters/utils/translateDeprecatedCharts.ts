export const translateDeprecatedCharts = (chartType: string) => {
  const map = {
    areachart: 'area',
    barchart: 'horizontal-bar',
    columnchart: 'bar',
    linechart: 'line',
    piechart: 'pie',
  };
  return map[chartType] || chartType || 'JSON';
};