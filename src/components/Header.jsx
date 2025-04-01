import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/global-styles.css";
import logo from "../assets/Short dark cropped.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Header component for the application.
 * It contains the logo, navigation links, and search bar.
 * @param {Object} props - Component props
 * @param {Function} props.setSearchTerm - Function to set the search term in parent component
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function Header({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the search term in the parent component
    if (setSearchTerm) {
      setSearchTerm(inputValue);
    }

    // Navigate to explore page with search query
    navigate(`/explore?search=${inputValue}`);
  };

  return (
    <header>
      <NavLink to="/" title="Home" id="index-link">
        <img src={logo} alt="Logo for Learniverse Connect" id="logo-header" />
      </NavLink>
      <form id="header-form" onSubmit={handleSubmit}>
        <input
          id="search-bar"
          title="Type and hit search to search for courses"
          type="text"
          name="search"
          placeholder="Search for courses..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" title="Search" id="search-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      <button id="hamburger-icon">&#9776;</button>
      <button id="x-icon">&#9747;</button>
      <nav id="header-nav">
        <NavLink className="header-link" to="/cart" title="Cart" id="cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </NavLink>
        <NavLink className="header-link" to="/explore" title="Courses">
          Courses
        </NavLink>
        <NavLink className="header-link" to="/compare">
          Compare
        </NavLink>
        <NavLink className="header-link" to="/about" title="About" id="about">
          About
        </NavLink>
        <NavLink
          className="header-link"
          to="/login"
          title="Sign in"
          id="sign-in-btn"
        >
          Sign in
        </NavLink>
        <NavLink
          className="header-link"
          to="/signup"
          title="Register"
          id="register-btn"
        >
          Register
        </NavLink>
      </nav>
    </header>
  );
}
