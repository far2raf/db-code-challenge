import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

import './style.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [valid, setValid] = useState(false);

    const setInvalidMessage = () => {
        if (invalid) {
            return (
                <div className="invalid">
                    Invalid username or password
                </div>
            );
        }

        return (
            <div className="invalid hidden">
                Invalid username or password
            </div>
        );
    }

    const onsubmit = (evt) => {
        evt.preventDefault();
        setInvalid(false);
        if (username !== 'admin' || password !== 'admin') {
            // alert('Invalid username or password!');
            setInvalid(true)
            return;
        }

        localStorage.setItem('token', '12345');
        setValid(true);

        window.location.href = '/dashboard';
    }

    const redirect = () => {
        if (valid) {
            return (
                <Redirect from="*" to="/dashboard" />
            );
        }

        return <></>;

    }

    const getForm = () => {
        if (!valid) {
            return(
                <form>
                    <h3>Sign in</h3>
                    <div className='form-group'>
                        { setInvalidMessage() }
                        <label>Login</label>
                        <input type='text'
                            required
                            className='form-control'
                            onChange={evt => setUsername(evt.target.value)}
                            placeholder='Enter your login'
                            value={username} 
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                            required
                            type='password'
                            className='form-control' 
                            placeholder='Enter your password'
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary btn-block'
                        onClick={evt => onsubmit(evt)}
                    >Submit</button>
                </form>
            );
        }

        return <></>;
    }

    if (!valid) {
        return (getForm());
    }

    return (redirect());
};

export default Login;
