import React from 'react';
import Report from './Report';
import Header from './Header/Header';

const Dashboard = () => {
    if (!localStorage.getItem('token')) {
        window.location.href = '/';
    }
    return (
        <div>
            <Header />
            <Report title='Average buy/sell prices per instrument' />
        </div>
    );
};

export default Dashboard;