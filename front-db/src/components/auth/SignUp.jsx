import React, { useState} from "react";
import { Link } from "react-router-dom";


const SignUp = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatpassword, setRepeatPassword] = useState('');
    const [required, setRequired] = useState(false);
    const [mismatch, setMismatch] = useState(false);

    const getRequired = () => {
        if (required) {
            return (
                <div className="invalid">
                    All fields must be required!!
                </div>
            )
        }

        return <></>;
    }

    const getMismatch = () => {
        if (mismatch) {
            return (
                <div className="invalid">
                    Passwords are not match!
                </div>
            )
        }

        return <></>;
    }

    const onsubmit = evt => {
        evt.preventDefault();
        setRequired(false);
        setMismatch(false);
        if (username === '' || password === '' || repeatpassword === '') {
            setRequired(true);
            return;
        }

        if (password !== repeatpassword) {
            setMismatch(true);
            return;
        }

        localStorage.setItem('token', '12345');
        window.location.href = '/dashboard';
    }

    return (
        <form>
            <h3>Sign Up</h3>
            { getRequired() }
            { getMismatch() }

            <div className="form-group">
                <label>Login</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Login"
                    onChange={evt => setUsername(evt.target.value)}
                    value={username}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={evt => setPassword(evt.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Repeat password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Repeat password"
                    value={repeatpassword}
                    onChange={evt => setRepeatPassword(evt.target.value)}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={evt => onsubmit(evt)}
            >
                Sign Up
            </button>
            
            <p className="forgot-password text-right">
                Already registered <Link to={"/sign-in"}>sign in?</Link>
            </p>
        </form>
    );
}

export default SignUp;