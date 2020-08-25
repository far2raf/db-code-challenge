import React, {useState} from 'react';
import DatetimeRangePicker from 'react-datetime-range-picker';
import './../Dashboard/Dashboard.css'
import DataTable from './../Table/DataTable';

const Report = (props) => {
    const dateChanged = () => {

    };
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
    const instruments = Array.from(new Set(sampleData.map(item => 
        item.instrumentName)));
    const counterparties = Array.from(new Set(sampleData.map(item =>
        item.cpty)));
    console.log(instruments);
    return (
        <div className='container'>
            <div className='card-header flex space-between'>
                <h3>{props.title}</h3>
                <DatetimeRangePicker onChange={dateChanged}/>
            </div>
            <div className='select'>
                <form>
                    <div className='flex'>
                        <div className='form-group'>
                            <label for='selectInstrument'>Select instrument</label>
                            <select className='form-control' id='selectInstrument'>
                                {instruments.map(item => 
                                    <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label for='selectInstrument'>Select counterparty</label>
                            <select className='form-control' id='selectInstrument'>
                            {counterparties.map(item => 
                                    <option key={item}>{item}</option>)}
                            </select>
                        </div>
                    </div>  
                </form>
            </div>
            <DataTable data={sampleData}/>   
        </div>
    );
};

export default Report;