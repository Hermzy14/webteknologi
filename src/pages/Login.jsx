import React, { useState } from "react";
import "../css/global-styles.css";
import "../css/log-sign.css";
import { NavLink, useNavigate } from "react-router-dom";

export function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
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
                credentials: "include",
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("token", data.jwt);
                alert("Login successful!");
                navigate("/"); // Redirect to landing page
            } else if (response.status === 401) {
                alert("Invalid username or password.");
            } else {
                alert("Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Could not connect to server.");
        }
    };

    return (
        <div className="container">
            <div id="image-container"></div>
            <div className="right-side">
                <div className="form-container">
                    <div className="tabs">
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? "active-tab tab-link" : "inactive-tab tab-link"
                            }
                        >
                            Log in
                        </NavLink>
                        <div className="separator"></div>
                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                isActive ? "active-tab tab-link" : "inactive-tab tab-link"
                            }
                        >
                            Sign up
                        </NavLink>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" className="login-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="user-input"
                            onChange={handleChange}
                        />

                        <label htmlFor="password" className="login-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="user-input"
                            onChange={handleChange}
                        />

                        <a href="#" className="forgot-password-tag">Forgot password?</a>
                        <button type="submit" id="login-button">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
