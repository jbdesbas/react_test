import AsyncSelect from 'react-select/async';

const wfs_endpoint = 'https://www.geo2france.fr/geoserver/spld/ows';
const layername = 'spld:communes';
const search_field = 'nom'





function WfsSelect(){

      function getOptions(filterText){
        return new Promise((resolve, reject)=> {
            fetch(`${wfs_endpoint}?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=${layername}&OUTPUTFORMAT=application%2Fjson&&srsName=EPSG:4326&CQL_FILTER=${search_field}%20ilike%20%27${filterText}%25%27`).then( response => {
                return response.json();
                }
            )
            .then(data => {
              let data2 = [];
              data.features.forEach((c) => { //ajouter directement à la table arquero ?
                    data2.push({value:c, label:c.properties[search_field]} )
                });
              resolve(data2)
            })
            .catch(error => {
                reject(error);
              });
        })
      
      }
    


      return (
        <AsyncSelect loadOptions={getOptions} />
  );
};

export default WfsSelect;
