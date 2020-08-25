import React from 'react';
import DataRow from './DataRow';

const DataTable = (props) => {
    let data = props.data;
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Instrument</th>
                    <th>Counterparty</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => <DataRow key={index} data = {item}/>)}
            </tbody>
        </table>
    );
};

export default DataTable;