import logo from './logo.svg';
import './App.css';
import WfsSelect from './components/multi-select';
import WfsDateRange from './components/temporal_range';

import React from 'react'



function App() {
    return (
    <div className="App">
        <p>Voici mon composant</p>
        <WfsSelect />
        <p> Time picker </p>
        <WfsDateRange />
    </div>
    
    
    )
}

export default App;
