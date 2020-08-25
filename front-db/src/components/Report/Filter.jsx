import React from 'react';
import DatetimeRangePicker from 'react-datetime-range-picker';
import '../Dashboard/Dashboard.css';

const Filter = (props) => {
    const instruments = props.instruments;
    const counterparties = props.counterparties;
    const handleChange = props.handleChange;
    return (
        <div className='filter'>
                <form>
                    <div className='flex'>
                        <div className='form-group'>
                            <label htmlFor='selectInstrument'>Select instrument</label>
                            <select multiple className='form-control' id='selectInstrument'>
                                <option>All</option>
                                {instruments.map(item => 
                                    <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='selectcpty'>Select counterparty</label>
                            <select multiple className='form-control' id='selectcpty'>
                                <option>All</option>
                                {counterparties.map(item => 
                                        <option key={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className='date'>
                            <DatetimeRangePicker/>
                        </div> 
                    </div>
                    <button type="submit" className="btn btn-primary">Filter</button>  
                </form>
            </div>
    );
};

export default Filter;