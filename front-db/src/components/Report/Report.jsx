import React, {useState, useEffect} from 'react';

import './../Dashboard/Dashboard.css'
import DataTable from './../Table/DataTable';
import Filter from './Filter';

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

const Report = (props) => {
    const [data, setData] = useState(sampleData);
    const [filteredData, setFilteredData] = useState(sampleData);
    const [instrument, setInstrument] = useState('All');
    const [cpty, setCpty] = useState('All');
    const [dateRange, setdateRange] = useState({});
    const filter = props.filter;
    const [instruments, setInstruments] = useState(Array.from(new Set(sampleData.map(item => 
        item.instrumentName))));
    const [counterparties, setCounterparties] = useState(Array.from(new Set(sampleData.map(item =>
        item.cpty))));
    const changeFilter = (event, instrument, cpty, dateRange) => {
        event.preventDefault();
        console.log(instrument, cpty, dateRange);
        setInstrument(instrument);
        setCpty(cpty);
        setdateRange(dateRange);
    };
    useEffect(() => {
        //add getting data for date range
        let dataFilter = data.filter(item => (instrument == 'All' || 
            item.instrumentName == instrument) && (cpty == 'All' || item.cpty == cpty));
        setFilteredData(dataFilter);
    }, [instrument, cpty, dateRange]);
    
    return (
        <div className='container'>
            <div className='card-header flex space-between'>
                <h3>{props.title}</h3>   
            </div>
            {filter &&
                <Filter clickHandler = {changeFilter} instruments={instruments} counterparties={counterparties} />}
            <DataTable data={filteredData}/>   
        </div>
    );
};

export default Report;