import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './style.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [valid, setValid] = useState(false);
    const [load, setLoad] = useState(false);

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

    const checkAnswer = (answer) => {
        if (answer.success) {
            setValid(true);
            localStorage.setItem('token', answer.token);
            localStorage.setItem('user', answer.user);
            window.location.href = '/dashboard';
        } else {
            setInvalid(true);
        }
    }

    const onsubmit = (evt) => {
        evt.preventDefault();
        setLoad(true);
        setInvalid(false);

        let body = new FormData();
        body.append('username', username);
        body.append('password', password);

        fetch(
            'http://127.0.0.1:8090/log-in',
            {
                method: 'POST',
                body: body,
            },
        )
            .then(res => {
                return res.json();
            })
            .then(res => {
                setLoad(false);
                checkAnswer(res);
            })
            .catch(res => {
            });
    }

    const redirect = () => {
        if (valid) {
            return (
                <Redirect from="*" to="/dashboard" />
            );
        }

        return <></>;

    }

    const getSubmitButton = () => {
        if (load) {
            return (
                <button
                    disabled
                    type='submit'
                    className='btn btn-primary btn-block'
                    onClick={evt => onsubmit(evt)}
                >Wait please</button>
            );
        }

        return (
            <button
                type='submit'
                className='btn btn-primary btn-block'
                onClick={evt => onsubmit(evt)}
            >Login</button>
        )
    }

    const getForm = () => {
        if (!valid) {
            return (
                <form>
                    <h3>Sign in</h3>
                    <div className='form-group'>
                        {setInvalidMessage()}
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
                    { getSubmitButton() }
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
