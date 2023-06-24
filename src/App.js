import logo from './logo.svg';
import './App.css';
import WfsSelect from './components/multi-select';
import WfsDateRange from './components/temporal_range';

import React, { useState } from 'react';
import { Card } from 'antd';
import { v4 as uuid } from 'uuid';

function App() {


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
    
    const addOrUpdateCritere = (id, filter) => { //ne fait que le add
        setCql_filter((prevStat) => [...addObjectOrUpdateArray(prevStat, {id:id, cql:filter}, 'id')]) //Il faut faire une copy du tableau pour re-render

    }
    

    return (
    <div className="App">
      <Card title="WFS Multiselect" style={{ width: 300 }}>
        
        <WfsSelect  wfs_endpoint="https://www.geo2france.fr/geoserver/odema/ows" search_field='nom' value_field='siret' layername = 'odema:trackdechets_etablissements'/>
      </Card>
      <Card title="Date Range" style={{ width: 300 }}>
        <WfsDateRange wfs_endpoint = "https://www.geo2france.fr/geoserver/odema/ows" layername = 'odema:trackdechets_etablissements' time_field = 'date_inscription' setCql_filter={addOrUpdateCritere}/>
      </Card>
      
      CQL FILTER = {JSON.stringify(cql_filter)}
    </div>  
    )
}

export default App;
