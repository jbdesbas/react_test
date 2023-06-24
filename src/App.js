import logo from './logo.svg';
import './App.css';
import WfsSelect from './components/multi-select';
import WfsDateRange from './components/temporal_range';

import React from 'react'
import { Card } from 'antd';


function App() {
    return (
    <div className="App">
      <Card title="WFS Multiselect" style={{ width: 300 }}>
        <WfsSelect wfs_endpoint="https://www.geo2france.fr/geoserver/spld/ows" search_field='nom' layername = 'spld:communes' />
        
        <WfsSelect wfs_endpoint="https://www.geo2france.fr/geoserver/odema/ows" search_field='nom' value_field='siret' layername = 'odema:trackdechets_etablissements' />
      </Card>
      <Card title="Date Range" style={{ width: 300 }}>
        <WfsDateRange wfs_endpoint = "https://www.geo2france.fr/geoserver/odema/ows" layername = 'odema:trackdechets_etablissements' time_field = 'date_inscription'/>
      </Card>
    </div>
    
    
    )
}

export default App;
