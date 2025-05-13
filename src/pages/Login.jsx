import React, { useState } from "react";
import "../css/global-styles.css";
import "../css/log-sign.css";
import { NavLink, useNavigate } from "react-router-dom";

export function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                alert("Login successful!");
                navigate("/");
            } else if (response.status === 401) {
                alert("Invalid credentials. Please try again.");
            } else {
                alert("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong.");
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
                            Register
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
