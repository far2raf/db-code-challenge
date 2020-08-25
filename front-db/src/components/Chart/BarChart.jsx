import React, {useState} from 'react';
import DatetimeRangePicker from 'react-datetime-range-picker';
import { Bar } from 'react-chartjs-2';
import './../Dashboard/Dashboard.css';


const BarChart = (props) => {
    const [dateRange, setDateRange] = useState({end: new Date(), start: new Date()});
    const title = props.title;
    const data = props.data;
    const dateFormat = (date) => {
        let partOfDay = (date.getHours() > 11) ? 'PM' : 'AM';
        let hour;
        if (date.getHours() == 0) {
            hour = 12;
        }
        else {
            hour = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours();
        }
        return dateRange.start.getMonth() + '/' + 
        dateRange.start.getDay() + '/' + dateRange.start.getFullYear() + " " +
        hour + ":" + dateRange.start.getMinutes() + ' ' + partOfDay;
    };
    const changeDates = (dateRange) => {
        console.log(dateFormat(dateRange.start));
        console.log(dateRange);
        setDateRange(dateRange);
    };
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
                    <DatetimeRangePicker onChange={changeDates}/>
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