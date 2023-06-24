/**
 * Composant WfsSelect utilisé pour afficher une liste déroulante asynchrone basée sur les données provenant d'un service WFS.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.layername - Le nom de la couche du service WFS à interroger.
 * @param {string} props.wfs_endpoint - L'URL de l'endpoint WFS utilisé pour récupérer les données.
 * @param {string} [props.search_field='label'] - Le champ à utiliser pour la recherche et l'affichage des options dans la liste déroulante.
 * @param {string} [props.value_field='code'] - Le champ à utiliser comme valeur pour les options sélectionnées dans la liste déroulante.
 * @returns {React.Component} Composant WfsSelect.
 */
 
import AsyncSelect from 'react-select/async';


function WfsSelect({key, layername, wfs_endpoint, search_field = 'label', value_field = 'code'} ){

      const getOptions = (filterText)=>{
        return new Promise((resolve, reject)=> {
            const cql_filter = `${search_field}%20ilike%20%27${filterText}%25%27`
            //setCql_filter(key, cql_filter)
            fetch(`${wfs_endpoint}?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=${layername}&OUTPUTFORMAT=application%2Fjson&&srsName=EPSG:4326&CQL_FILTER=${cql_filter}`).then( response => {
                return response.json();
                }
            ).then(data => {
              const data2 = data.features.map(c => ({value:c.properties[value_field], label:c.properties[search_field]}) );
              resolve(data2);
            })
            .catch(error => {
                console.log(error);
                reject(error);
              });
        })
      }
    
      return (
        <AsyncSelect loadOptions={getOptions} />
  );
};

export default WfsSelect;
