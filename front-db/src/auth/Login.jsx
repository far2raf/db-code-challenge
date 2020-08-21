import React, {useState} from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onsubmit = (evt) => {
        evt.preventDefault();
        if (username !== 'admin' || password !== 'admin') {
            alert('Invalid username or password!')
        }

        localStorage.setItem('token', '12345');
    }

    return(
        <form>
            <h3>Sign in</h3>
            <div className='form-group'>
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
};

export default Login;