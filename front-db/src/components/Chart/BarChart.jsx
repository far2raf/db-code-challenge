import React from 'react';
import DatetimeRangePicker from 'react-datetime-range-picker';
import { Bar } from 'react-chartjs-2';
import './../Dashboard/Dashboard.css';


const BarChart = (props) => {
    const title = props.title;
    const data = props.data;
    const dataForChart = {
        labels: data.map(item => item.instrument),
        datasets: [{
            label: 'Average buy',
            data: data.map(item => item.buy),
            backgroundColor: 'rgb(255, 99, 132)'
        }, {
            label: 'Average sell',
            data: data.map(item => item.sell),
            backgroundColor: 'rgb(0, 128, 255)'
        }]
    };
    return (
        <div className='container'>
            <div>
                <div className="card-header flex space-between">
                    <h3>{title}</h3>
                    <DatetimeRangePicker/>
                </div>
                <Bar data={dataForChart}
                    width={1200}
                    height={500}
                />
            </div>       
        </div> 
    );
};

export default BarChart;