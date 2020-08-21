import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Login</label>
                    <input type="text" className="form-control" placeholder="Login" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Repeat password</label>
                    <input type="password" className="form-control" placeholder="Repeat password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to={"/sign-in"}>sign in?</Link>
                </p>
            </form>
        );
    }
}