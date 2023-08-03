import WfsSelect from './multi-select';
import WfsDateRange from './temporal_range';
import WfsControl from './wfs-control';
import WfsTable from './table';
import {queryWFS} from '../utils';

import React, {useEffect, useState } from 'react';
import { Card } from 'antd';

export default function PageWfs(){

    const wfs_endpoint="https://www.geo2france.fr/geoserver/odema/ows"
    const layername = "odema:trackdechets_etablissements"

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
    const [features, setFeatures] = useState([]);
    
    const formatedCql = (m)=> m.map(e => '('+e.cql+')').join('and'); //Formater une liste de filtre en str pret à être utiliser dans l'URL
    
    const addOrUpdateCritere = (id, filter) => { //ne fait que le add
        setCql_filter((prevStat) => [...addObjectOrUpdateArray(prevStat, {id:id, cql:filter}, 'id')]) //Il faut faire une copy du tableau pour re-render
        queryWFS(wfs_endpoint, layername, {CQL_FILTER:formatedCql(cql_filter)}).then(data=> setNFeature(data.totalFeatures));
    }
    
    function downloadData() {
        console.log('dl !');
        return new Promise((resolve, reject) => {
                queryWFS(wfs_endpoint, layername, {CQL_FILTER:formatedCql(cql_filter), COUNT:10})
             .then(data =>
                {setFeatures(data.features) }
                ); 
        })
    }
    
    useEffect(() => { // here
        downloadData()
  }, [cql_filter])
  
    return (
    <>
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
    
    <WfsTable features = {features} />
    </>
    
    )
}
