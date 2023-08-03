import './App.css';

import PageWfs from './components/page_wfs';
import FormTonnage from './components/form_tonnage';


import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



export default function App() {
    
    return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageWfs />} />
          <Route path="/form" element={<FormTonnage />} />
        </Routes>
    </BrowserRouter>

    <hr/>

    </div>  
    )
};


