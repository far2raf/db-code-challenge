import React, {useState} from 'react';

import './../Dashboard/Dashboard.css'
import DataTable from './../Table/DataTable';
import Filter from './Filter';

const Report = (props) => {
    let sampleData = [{
            "instrumentName": "Galactia", 
            "cpty": "Lewis", 
            "price": 9964.235074757127, 
            "type": "S", 
            "quantity": 71, 
            "time": "11-Aug-2019 (12:07:06.471252)"},
        {
            "instrumentName": "Galactia", 
            "cpty": "John", 
            "price": 9964.235074757127, 
            "type": "S", 
            "quantity": 71, 
            "time": "11-Aug-2019 (12:07:06.471252)"},
        {
            "instrumentName": "Eclipse", 
            "cpty": "Lewis", 
            "price": 9964.235074757127, 
            "type": "S", 
            "quantity": 71, 
            "time": "11-Aug-2019 (12:07:06.471252)"}];
    
    const filter = props.filter;
    const instruments = Array.from(new Set(sampleData.map(item => 
        item.instrumentName)));
    const counterparties = Array.from(new Set(sampleData.map(item =>
        item.cpty)));
    return (
        <div className='container'>
            <div className='card-header flex space-between'>
                <h3>{props.title}</h3>   
            </div>
            {filter &&
                <Filter  instruments={instruments} counterparties={counterparties} />}
            <DataTable data={sampleData}/>   
        </div>
    );
};

export default Report;