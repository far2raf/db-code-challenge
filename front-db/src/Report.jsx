import React from 'react';
import DatetimeRangePicker from 'react-datetime-range-picker';
import './Dashboard.css'
import DataTable from './DataTable';

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
            "cpty": "Lewis", 
            "price": 9964.235074757127, 
            "type": "S", 
            "quantity": 71, 
            "time": "11-Aug-2019 (12:07:06.471252)"}];
    return (
        <div className='container'>
            <div className='card-header flex space-between'>
                <h3>{props.title}</h3>
                <DatetimeRangePicker/>
            </div>
            <div className='select'>
                <form>
                    <div className='flex'>
                        <div className='form-group'>
                            <label for='selectInstrument'>Select instrument</label>
                            <select className='form-control' id='selectInstrument'>
                                <option>Galactia</option>
                                <option>Eclipse</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label for='selectInstrument'>Select counterparty</label>
                            <select className='form-control' id='selectInstrument'>
                                <option>Lewis</option>
                                <option>John</option>
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