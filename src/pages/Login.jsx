import React from "react";
import "../css/global-styles.css";
import "../css/log-sign.css";
import {NavLink} from "react-router-dom";


export function Login () {
    return (
        <div className="container">
            <div id="image-container">
                <img src="your-image.jpg" alt="Login Illustration"/>
            </div>

            <div className="right-side">
                <div className="form-container">
                    <div className="tabs">
                        <NavLink
                            to="/login"
                            className={({isActive}) =>
                                isActive ? "active-tab tab-link" : "inactive-tab tab-link"
                            }
                        >
                            Log in
                        </NavLink>
                        <div className="separator"></div>
                        <NavLink
                            to="/signup"
                            className={({isActive}) =>
                                isActive ? "active-tab tab-link" : "inactive-tab tab-link"
                            }
                        >
                            Sign up
                        </NavLink>
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
