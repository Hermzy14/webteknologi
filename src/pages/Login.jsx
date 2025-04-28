import React from "react";
import "../css/global-styles.css";
import "../css/login.css";


export function Login () {
    return (
        <div className="container">
            <div className="image-container">
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
                            <a href="#" className="signup-link">Sign up</a>
                        </h2>
                    </div>

                    <form>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required/>

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>

                        <a href="#">Forgot password?</a>
                        <button type="submit" id="login-button">Log in</button>
                    </form>
                </div>
            </div>
        </div>

);
}

export default Login;
