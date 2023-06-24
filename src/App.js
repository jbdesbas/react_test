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
        <WfsSelect />
      </Card>
      <Card title="Date Range" style={{ width: 300 }}>
        <WfsDateRange />
      </Card>
    </div>
    
    
    )
}

export default App;
