module.exports = {
  exportToCsv: function(data, filename) {
	  var csvContent = 'data:text/csv;charset=utf-8,';

	  data.forEach(function(infoArray, index){
	    dataString = infoArray.join(',');
      csvContent += index < data.length ? dataString+ '\n' : dataString;
	  });

	  var encodedUri = encodeURI(csvContent);
	  var link = document.createElement('a');

	  link.setAttribute('href', encodedUri);
	  link.setAttribute('download', filename);

	  document.body.appendChild(link);

	  link.click();
  }
}
