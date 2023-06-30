import './App.css';
import WfsSelect from './components/multi-select';
import WfsDateRange from './components/temporal_range';
import WfsControl from './components/wfs-control';
import WfsTable from './components/table';

import React, { useState } from 'react';
import { Card } from 'antd';



function App() {

    const wfs_endpoint="https://www.geo2france.fr/geoserver/odema/ows"
    const layername = "odema:trackdechets_etablissements"
    const base_url = `${wfs_endpoint}?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=${layername}&OUTPUTFORMAT=application%2Fjson`

    function addObjectOrUpdateArray(array, obj, indexField) {
      const index = array.findIndex((item) => item[indexField] === obj[indexField]);
      if (index === -1) {
        // L'objet n'est pas présent dans le tableau, on l'ajoute directement
        array.push(obj);
      } else {
        // L'objet est déjà présent, on met à jour ses champs avec les valeurs de l'objet à ajouter
        array[index] = { ...array[index], ...obj };
      }
      return array
    }
    


    const [cql_filter, setCql_filter] = useState([]);
    const [nFeature, setNFeature] = useState(999);
    
    const formatedCql = (m)=> m.map(e => '('+e.cql+')').join('and'); //Formater une liste de filtre en str pret à être utiliser dans l'URL
    
    const addOrUpdateCritere = (id, filter) => { //ne fait que le add
        setCql_filter((prevStat) => [...addObjectOrUpdateArray(prevStat, {id:id, cql:filter}, 'id')]) //Il faut faire une copy du tableau pour re-render
        fetch_data(wfs_endpoint, formatedCql(cql_filter)).then(data=> setNFeature(data.totalFeatures)); //Relance la requete avec le nouveau filtre TODO : ne prendre qu'un seul attribut
    }
    
    const fetch_data = (wfs_endpoint, cql_filter)=> {
        return new Promise((resolve, reject)=> {
        let url = base_url;
        if (cql_filter.length > 0 ) {
            url = `${base_url}&CQL_FILTER=${cql_filter}`
        }
        fetch(url).then(
            response => {
                resolve(response.json())
            }
        ).catch(error => {
            console.log(error);
            reject(error);
        });
      }); 
    }
    

    return (
    <div className="App">
      <WfsControl>
        <Card title="WFS Multiselect" style={{ width: 300 }}>
            <WfsSelect wfs_endpoint={wfs_endpoint} search_field='nom' value_field='siret' layername ={layername}/>
        </Card>
        <Card title="Date Range" style={{ width: 300 }}>
            <WfsDateRange wfs_endpoint={wfs_endpoint} layername = {layername} time_field = 'date_inscription' setCql_filter={addOrUpdateCritere}/>
        </Card>
        CQL FILTER = {JSON.stringify(cql_filter)}
        <br/>
        Nfeatures = {nFeature}
    </WfsControl>
    
    <WfsTable wfs_endpoint={wfs_endpoint} layername = {layername} cqlFilter = {formatedCql(cql_filter)}/>
    </div>  
    )
}

export default App;
