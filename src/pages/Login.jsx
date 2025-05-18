import React, { useState } from "react";
import "../css/global-styles.css";
import "../css/log-sign.css";
import { NavLink, useNavigate } from "react-router-dom";
import { sendAuthenticationRequest } from "../tools/authentication";
import { useAuth } from "../components/AuthContext";

export function Login() {
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await sendAuthenticationRequest(
      formData.username,
      formData.password,
      (userData) => {
        // Success callback
        setIsLoading(false);
        refreshUser();
        alert("Login successful!");
        navigate("/"); // Redirect to landing page
      },
      (errorMessage) => {
        // Error callback
        setIsLoading(false);
        setError(errorMessage);
        alert("Login failed: Username or password is incorrect ");
      }
    );
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
              Register
            </NavLink>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="login-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="user-input"
              onChange={handleChange}
            />

            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="user-input"
              onChange={handleChange}
            />

            <a href="#" className="forgot-password-tag">
              Forgot password?
            </a>
            <button type="submit" id="login-button">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
