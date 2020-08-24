import React from 'react';
import Report from './Report';
import Header from './Header/Header';

import {Bar} from 'react-chartjs-2';
import BarChart from './BarChart';

const Dashboard = () => {
    if (!localStorage.getItem('token')) {
        window.location.href = '/';
    }
    return (
        <div>
            <Header />
            <Report title='Historical data' />
            <BarChart/>
        </div>
    );
};

export default Dashboard;