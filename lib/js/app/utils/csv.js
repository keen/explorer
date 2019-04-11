export const exportToCsv = (data, filename) => {
  let csvContent = 'data:text/csv;charset=utf-8,';

  data.forEach(function(row, i){
    row.forEach(function(cell, j){
      csvContent += String(cell).replace(/,/g, '');
       if (row.length > j+1) {
         csvContent += ',';
        }
    });
    if (data.length > i+1) {
      csvContent += '\n';
    }
  });

  let filenameWithExt = filename;
  if (!filename.includes('.csv')) {
    filenameWithExt = `${filename}.csv`;
  }

  const htmlElement = document.createElement('a');
  htmlElement.setAttribute('href', encodeURI(csvContent));
  htmlElement.setAttribute('download', filenameWithExt);
  document.body.appendChild(htmlElement);
  htmlElement.click();
}
  