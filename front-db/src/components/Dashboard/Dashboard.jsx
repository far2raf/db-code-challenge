import React from 'react';
import Report from './../Report/Report';
import Header from './../Header/Header';

import {Bar} from 'react-chartjs-2';
import BarChart from './../Chart/BarChart';

const sampleData = [
    { "instrument": "Galactia", "buy": 4444, "sell": 4200 },
    { "instrument": "Astronomica", "buy": 3400, "sell": 3200 },
    { "instrument": "Lunatic", "buy": 1800, "sell": 1600 },
    { "instrument": "Eclipse", "buy": 9800, "sell": 9300 },
    { "instrument": "Heliosphere", "buy": 7800, "sell": 7200 },
];

const Dashboard = () => {
    return (
        <div>
            <Header />
            <Report title='Historical data' />
            <BarChart data={sampleData} title='Average buy/sell per instrument' />
        </div>
    );
};

export default Dashboard;