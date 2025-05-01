import React from "react";
import "../css/global-styles.css";
import "../css/login.css";
import {NavLink} from "react-router-dom";


export function Login () {
    return (
        <div className="container">
            <div id="image-container">
                <img src="your-image.jpg" alt="Login Illustration"/>
            </div>

            <div className="right-side">
                <div className="login-container">
                    <div className="tabs">
                        <h2 className="login-tab active">
                            <a href="#" className="login-link">Log in</a>
                        </h2>
                        <div className="separator"></div>
                        <h2 className="signup-tab">
                            <NavLink to="/signup" className="signup-link">Sign up</NavLink>
                        </h2>
                    </div>

                    <form>
                        <label htmlFor="email" className="login-label">Email</label>
                        <input type="email" id="email" name="email" required className="user-input"/>

                        <label htmlFor="password" className="login-label">Password</label>
                        <input type="password" id="password" name="password" required className="user-input"/>

                        <a href="#" className="forgot-password-tag">Forgot password?</a>
                        <button type="submit" id="login-button">Log in</button>
                    </form>
                </div>
            </div>
        </div>

);
}

export default Login;
