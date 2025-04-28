import "../css/signup.css";
import "../css/global-styles.css";

export function Signup() {
    return(
        <div className="container">
            <div className="image-container">
                <img src="your-image.jpg" alt="Login Illustration" />
            </div>

            <div className="right-side">
                <div className="sign-up-container">
                    <div className="tabs">
                        <h2 className="sign-tab active">
                            <a href="#" className="signup-link">Log in</a>
                        </h2>
                        <div className="separator"></div>
                        <h2 className="signup-tab">
                            <a href="#" className="signup-link">Sign up</a>
                        </h2>
                    </div>

                    <form id="signup-form">
                        <label htmlFor="signup-email">Email</label>
                        <input type="email" id="signup-email" name="email" required />

                        <label htmlFor="signup-name">Full-name</label>
                        <input type="text" id="signup-name" name="name" required />

                        <label htmlFor="signup-password">Password</label>
                        <input type="password" id="signup-password" name="password" required />

                        <label htmlFor="signup-password-confirm">Confirm password</label>
                        <input type="password" id="signup-password-confirm" name="passwordConfirm" required />

                        <button type="submit" id="sign-up-button">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
);
}

export default Signup;