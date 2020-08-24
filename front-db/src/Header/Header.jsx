import React from 'react';
import './Header.css';

const Header = () => {
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div class="header">
            <div class="username">
                Username
            </div>
            <button class="logout" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Header
