function queryWFS(url, layername, options = {}) {
  const encodedLayername = encodeURIComponent(layername);
  const baseUrl = `${url}?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=${encodedLayername}&OUTPUTFORMAT=application%2Fjson&srsName=EPSG:4326`;

  const queryParams = Object.entries(options)
    .map(([param, value]) => {
      if (value) {
        const encodedValue = encodeURIComponent(value);
        return `${param}=${encodedValue}`;
      }
      return '';
    })
    .filter(query => query !== '')
    .join('&');

  const fullUrl = `${baseUrl}&${queryParams}`;

  return new Promise((resolve, reject) => {
    fetch(fullUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error querying WFS:', response.status);
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => {
        console.error('Error querying WFS:', error);
        reject(error);
      });
  });
};

export default queryWFS;
