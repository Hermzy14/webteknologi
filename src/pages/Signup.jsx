import "../css/log-sign.css";
import "../css/global-styles.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.passwordConfirm) {
            alert("Passwords do not match");
            return;
        }

        const payload = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
        };

        try {
            const response = await fetch("http://localhost:8080/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 201) {
                alert("Signup successful!");
                // Optionally redirect to login page:
                // window.location.href = "/login";
            } else if (response.status === 409) {
                alert("Email or username already exists.");
            } else {
                alert("Signup failed.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Something went wrong. Try again.");
        }
    };

    return (
        <div className="container">
            <div id="image-container">
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

                    <form id="signup-form" onSubmit={handleSubmit}>
                        <label htmlFor="signup-email" className="signup-label">Email</label>
                        <input
                            type="email"
                            id="signup-email"
                            name="email"
                            required
                            className="user-input"
                            onChange={handleChange}
                        />

                        <label htmlFor="signup-username" className="signup-label">Username</label>
                        <input
                            type="text"
                            id="signup-username"
                            name="username"
                            required
                            className="user-input"
                            onChange={handleChange}
                        />

                        <label htmlFor="signup-password" className="signup-label">Password</label>
                        <input
                            type="password"
                            id="signup-password"
                            name="password"
                            required
                            className="user-input"
                            onChange={handleChange}
                        />

                        <label htmlFor="signup-password-confirm" className="signup-label">Confirm password</label>
                        <input
                            type="password"
                            id="signup-password-confirm"
                            name="passwordConfirm"
                            required
                            className="user-input"
                            onChange={handleChange}
                        />

                        <button type="submit" id="sign-up-button">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
