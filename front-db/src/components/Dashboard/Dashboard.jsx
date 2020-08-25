import React from 'react';
import Report from './../Report/Report';
import Header from './../Header/Header';

import {Bar} from 'react-chartjs-2';
import BarChart from './../Chart/BarChart';


const Dashboard = () => {
    return (
        <div>
            <Header />
            <Report title='Streaming data' filter={false}/>
            <Report title='Historical data' filter={true}/>
            <BarChart title='Average buy/sell per instrument' />
        </div>
    );
};

export default Dashboard;