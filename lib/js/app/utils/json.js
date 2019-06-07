export const exportToJson = (data, filename) => {
  const htmlElement = document.createElement('a');
  htmlElement.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURI(JSON.stringify(data)));
  let filenameWithExt = filename;
  if (!filename.includes('.json')) {
    filenameWithExt = `${filename}.json`;
  }
  htmlElement.setAttribute('download', filenameWithExt);
  document.body.appendChild(htmlElement);
  htmlElement.click();
}
