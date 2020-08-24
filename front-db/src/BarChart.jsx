import React from 'react';
import DatetimeRangePicker from 'react-datetime-range-picker';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css';

const sampleData = [
    { "instrument": "Galactia", "buy": 4444, "sell": 4200 },
    { "instrument": "Astronomica", "buy": 3400, "sell": 3200 },
    { "instrument": "Lunatic", "buy": 1800, "sell": 1600 },
    { "instrument": "Eclipse", "buy": 9800, "sell": 9300 },
    { "instrument": "Heliosphere", "buy": 7800, "sell": 7200 },
];

const BarChart = () => {
    const data = {
        labels: sampleData.map(item => item.instrument),
        datasets: [{
            label: 'Average buy',
            data: sampleData.map(item => item.buy),
            backgroundColor: 'rgb(255, 99, 132)'
        }, {
            label: 'Average sell',
            data: sampleData.map(item => item.sell),
            backgroundColor: 'rgb(0, 128, 255)'
        }]
    };
    return (
        <div className='container'>
            <div>
                <div className="card-header flex space-between">
                    <h3>Average buy/sell per instrument</h3>
                    <DatetimeRangePicker/>
                </div>
                <Bar data={data}
                    width={1200}
                    height={500}
                />
            </div>       
        </div> 
    );
};

export default BarChart;