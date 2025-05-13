import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../css/global-styles.css";
import logo from "../assets/Short dark cropped.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./CartContext";
import { useCourses } from "./CourseProvider";
import { useAuth } from "./AuthContext";

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
  const { courses } = useCourses();
  const { currentUser, logout } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Generate suggestions as user types
  useEffect(() => {
    if (inputValue.length >= 1) {
      const term = inputValue.toLowerCase();
      const matchedSuggestions = [];
      const addedTitles = new Set(); // To prevent duplicates

      courses.forEach((course) => {
        // Add course title if it matches
        if (
          course.title.toLowerCase().includes(term) &&
          !addedTitles.has(course.title)
        ) {
          matchedSuggestions.push({ text: course.title, id: course.id });
          addedTitles.add(course.title);
        }

        // Add keywords if available and they match
        if (course.keywords) {
          const keywords = course.keywords.split(",").map((k) => k.trim());
          keywords.forEach((keyword) => {
            if (
              keyword.toLowerCase().includes(term) &&
              !addedTitles.has(keyword)
            ) {
              matchedSuggestions.push({ text: keyword, id: course.id });
              addedTitles.add(keyword);
            }
          });
        }
      });

      setSuggestions(matchedSuggestions);
      setShowSuggestions(matchedSuggestions.length > 0);
      setActiveSuggestion(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, courses]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the search term in the parent component
    if (setSearchTerm) {
      setSearchTerm(inputValue);
    }

    // Navigate to explore page with search query
    navigate(`/explore?search=${inputValue}`);
    setShowSuggestions(false);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.text);
    if (setSearchTerm) {
      setSearchTerm(suggestion.text);
    }
    navigate(`/explore?search=${suggestion.text}`);
    setShowSuggestions(false);
  };

  // Handle keyboard navigation in suggestions
  const handleKeyDown = (e) => {
    // Down arrow
    if (e.keyCode === 40) {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }
    // Up arrow
    else if (e.keyCode === 38) {
      e.preventDefault();
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
    }
    // Enter
    else if (e.keyCode === 13 && activeSuggestion !== -1) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestion]);
    }
    // Escape
    else if (e.keyCode === 27) {
      setShowSuggestions(false);
    }
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

  // Check if the user is logged in
  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
      setIsAdmin(currentUser.roles && currentUser.roles.includes("ADMIN"));
    } else {
      setLoggedIn(false);
      setIsAdmin(false);
    }
  }, [currentUser]);

  // Handle logging out
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header>
      <NavLink to="/" title="Home" id="index-link" onClick={handleLinkClick}>
        <img src={logo} alt="Logo for Learniverse Connect" id="logo-header" />
      </NavLink>
      <div id="search-container" ref={searchContainerRef}>
        <form id="header-form" onSubmit={handleSubmit}>
          <input
            id="search-bar"
            title="Type and hit search to search for courses"
            type="text"
            name="search"
            placeholder="Search for courses..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={() => inputValue.length >= 2 && setSuggestions(true)}
          />
          <button type="submit" title="Search" id="search-btn">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>

        {showSuggestions && (
          <ul className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div className="wrapper" key={`${suggestion.id}-${index}`}>
                <li
                  className={index === activeSuggestion ? "active" : ""}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setActiveSuggestion(index)}
                >
                  {suggestion.text}
                </li>
                {suggestions.length !== index + 1 ? (
                  <hr id="suggestion-divider" />
                ) : (
                  ""
                )}
              </div>
            ))}
          </ul>
        )}
      </div>
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
          title="Explore courses"
          onClick={handleLinkClick}
        >
          Explore
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

        {/* Check if user is logged in, and show link to profile page for all logged in users, as well as a log out button */}
        {loggedIn ? (
          <>
            <NavLink
              className="header-link"
              to="/profile"
              title="Profile"
              id="profile"
              onClick={handleLinkClick}
            >
              Profile
            </NavLink>

            {/* Show admin link only if user is an admin */}
            {isAdmin && (
              <NavLink
                className="header-link"
                to="/admin"
                title="Admin"
                id="admin-btn"
                onClick={handleLinkClick}
              >
                Admin
              </NavLink>
            )}

            <NavLink
              className="header-link"
              to="/login"
              title="Log out"
              id="logout"
              onClick={() => {
                handleLinkClick();
                handleLogout();
              }}
            >
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="header-link"
              to="/login"
              title="Sign in"
              id="sign-in-btn"
              onClick={handleLinkClick}
            >
              Log in
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
          </>
        )}
      </nav>
    </header>
  );
}
