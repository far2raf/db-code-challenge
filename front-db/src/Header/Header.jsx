import React from 'react';
import './Header.css';

const Header = () => {
    let checkConnection = true;
    const logout = () => {
        localStorage.removeItem('token');
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
                Username
            </div>
            <button className="logout" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Header
