import React, {useState} from 'react';
import DatetimeRangePicker from 'react-datetime-range-picker';
import '../Dashboard/Dashboard.css';

const Filter = (props) => {
    const [dateRange, setDateRange] = useState({});
    const instruments = props.instruments;
    const counterparties = props.counterparties;
    const clickHandler = props.clickHandler;
    const changeDates = (dateRange) => {
        setDateRange(dateRange);
    };
    return (
        <div className='filter'>
                <form>
                    <div className='flex'>
                        <div className='form-group'>
                            <label htmlFor='selectInstrument'>Select instrument</label>
                            <select className='form-control' id='selectInstrument'>
                                <option>All</option>
                                {instruments.map(item => 
                                    <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='selectcpty'>Select counterparty</label>
                            <select className='form-control' id='selectcpty'>
                                <option>All</option>
                                {counterparties.map(item => 
                                        <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className='date'>
                            <DatetimeRangePicker onChange={changeDates} />
                        </div> 
                    </div>
                    <button onClick={event => {  
                        let selectedInstrument = document.getElementById('selectInstrument').value;
                        let selectedCpty = document.getElementById('selectcpty').value;
                        clickHandler(event, selectedInstrument, selectedCpty, dateRange);}} 
                    className="btn btn-primary">Filter</button>  
                </form>
            </div>
    );
};

export default Filter;