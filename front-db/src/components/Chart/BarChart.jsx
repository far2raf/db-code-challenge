import React, {useState, useEffect} from 'react';
import DatetimeRangePicker from 'react-datetime-range-picker';
import { Bar } from 'react-chartjs-2';
import './../Dashboard/Dashboard.css';

const sampleData = [
    { "instrument": "Galactia", "buy": 4444, "sell": 4200 },
    { "instrument": "Astronomica", "buy": 3400, "sell": 3200 },
    { "instrument": "Lunatic", "buy": 1800, "sell": 1600 },
    { "instrument": "Eclipse", "buy": 9800, "sell": 9300 },
    { "instrument": "Heliosphere", "buy": 7800, "sell": 7200 },
];

const BarChart = (props) => {
    const [dateRange, setDateRange] = useState({end: new Date(), start: new Date()});
    const [data, setData] = useState(sampleData);
    const [dataForChart, setDataForChart] = useState({});
    const title = props.title;
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
    useEffect(() => {
        //add getting data
        setDataForChart(prepareData(data));
    }, [data]);
    const prepareData = (data) => {
        return {
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