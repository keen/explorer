module.exports = {
  exportToCsv: function(data, filename) {
    var csvContent = 'data:text/csv;charset=utf-8,';
    var htmlElement;

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

    htmlElement = document.createElement('a');
    htmlElement.setAttribute('href', encodeURI(csvContent));
    htmlElement.setAttribute('download', filename);
    document.body.appendChild(htmlElement);
    htmlElement.click();
  }
}
