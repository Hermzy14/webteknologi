import "../css/signup.css";
import "../css/global-styles.css";
import {NavLink} from "react-router-dom";

export function Signup() {
    return(
        <div className="container">
            <div id="image-container">
                <img src="your-image.jpg" alt="Login Illustration" />
            </div>

            <div className="right-side">
                <div className="sign-up-container">
                    <div className="tabs">
                        <h2 className="sign-tab active">
                            <NavLink to="/login" className="signup-link">Log in</NavLink>
                        </h2>
                        <div className="separator"></div>
                        <h2 className="signup-tab">
                            <a href="#" className="signup-link">Sign up</a>
                        </h2>
                    </div>

                    <form id="signup-form">
                        <label htmlFor="signup-email" className="signup-label">Email</label>
                        <input type="email" id="signup-email" name="email" required className="user-input"/>

                        <label htmlFor="signup-name" className="signup-label">Full-name</label>
                        <input type="text" id="signup-name" name="name" required className="user-input"/>

                        <label htmlFor="signup-password" className="signup-label">Password</label>
                        <input type="password" id="signup-password" name="password" required className="user-input"/>

                        <label htmlFor="signup-password-confirm" className="signup-label">Confirm password</label>
                        <input type="password" id="signup-password-confirm" name="passwordConfirm" required className="user-input" />

                        <button type="submit" id="sign-up-button">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
);
}

export default Signup;