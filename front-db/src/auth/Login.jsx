import React, {useState} from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <form>
            <h3>Sign in</h3>
            <div className='form-group'>
                <label>Login</label>
                <input type='text' className='form-control' 
                    placeholder='Enter your login'></input>
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type='password' className='form-control' 
                    placeholder='Enter your password'></input>
            </div>
            <button type='submit' className='btn btn-primary btn-block'>Submit</button>
        </form>
    );
};

export default Login;