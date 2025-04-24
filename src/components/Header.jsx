import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/global-styles.css";
import logo from "../assets/Short dark cropped.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./CartContext";

/**
 * Header component for the application.
 * It contains the logo, navigation links, and search bar.
 * @param {Object} props - Component props
 * @param {Function} props.setSearchTerm - Function to set the search term in parent component
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function Header({ setSearchTerm }) {
  const { getCartCount } = useCart();
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

  // Handle opening and closing of the hamburger menu
  const handleMobileMenu = () => {
    const nav = document.getElementById("header-nav");
    const xIcon = document.getElementById("x-icon");
    const hamburgerIcon = document.getElementById("hamburger-icon");

    // Hide the hamburger icon and show the x icon when the menu is open
    if (nav.classList.contains("active")) {
      hamburgerIcon.style.display = "block";
      xIcon.style.display = "none";
    } else {
      // Hide the hamburger icon and show the x icon when the menu is closed
      hamburgerIcon.style.display = "none";
      xIcon.style.display = "block";
    }

    // Toggle the visibility of the navigation menu
    nav.classList.toggle("active");
  };

  // Handle closing the mobile menu when a link is clicked
  const handleLinkClick = () => {
    const nav = document.getElementById("header-nav");
    const xIcon = document.getElementById("x-icon");
    const hamburgerIcon = document.getElementById("hamburger-icon");

    // Hide the x icon and show the hamburger icon when a link is clicked
    hamburgerIcon.style.display = "block";
    xIcon.style.display = "none";

    // Close the navigation menu
    nav.classList.remove("active");
  };

  return (
    <header>
      <NavLink to="/" title="Home" id="index-link" onClick={handleLinkClick}>
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
      <button id="hamburger-icon" onClick={handleMobileMenu}>
        &#9776;
      </button>
      <button id="x-icon" onClick={handleMobileMenu}>
        &#9747;
      </button>
      <nav id="header-nav">
        <NavLink
          className="header-link"
          to="/cart"
          title="Cart"
          id="cart"
          onClick={handleLinkClick}
        >
          {" "}
          <div className="cart-icon-container">
            <FontAwesomeIcon icon={faCartShopping} />
            {getCartCount() > 0 && (
              <span className="cart-count">{getCartCount()}</span>
            )}
          </div>
        </NavLink>
        <NavLink
          className="header-link"
          to="/explore"
          title="Courses"
          onClick={handleLinkClick}
        >
          Courses
        </NavLink>
        <NavLink
          className="header-link"
          to="/compare"
          onClick={handleLinkClick}
        >
          Compare
        </NavLink>
        <NavLink
          className="header-link"
          to="/about"
          title="About"
          id="about"
          onClick={handleLinkClick}
        >
          About
        </NavLink>
        <NavLink
          className="header-link"
          to="/login"
          title="Sign in"
          id="sign-in-btn"
          onClick={handleLinkClick}
        >
          Sign in
        </NavLink>
        <NavLink
          className="header-link"
          to="/signup"
          title="Register"
          id="register-btn"
          onClick={handleLinkClick}
        >
          Register
        </NavLink>
      </nav>
    </header>
  );
}
