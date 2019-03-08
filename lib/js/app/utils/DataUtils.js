export default {
  exportToCsv: function(data, filename) {
    var csvContent = '';
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

    var encodedData = '';
    if (typeof window !== 'undefined' && window.URL) {
      var blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv; charset=utf-8' });
      encodedData = window.URL.createObjectURL(blob);
    } else {
      encodedData = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    }

    htmlElement = document.createElement('a');
    htmlElement.setAttribute('href', encodedData);
    htmlElement.setAttribute('download', filename);
    document.body.appendChild(htmlElement);
    htmlElement.click();
  }
}
