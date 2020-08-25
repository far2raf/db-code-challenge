import React from 'react';
import './Header.css';

const Header = () => {
    let checkConnection = true;
    const getUsername = () => {
        return localStorage.getItem('user')
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    const checkConnectToDB = () => {
        if (checkConnection) {
            return (
                <div className="connect success">
                    Connection successful
                </div>
            );
        }

        return (
            <div className="connect fail">
                Connection failed
            </div>
        );
    }

    return (
        <div className="header">
            { checkConnectToDB() }
            <div className="username">
                { getUsername() }
            </div>
            <button className="logout" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Header
