import { NavLink } from "react-router-dom";
import "../css/global-styles.css";
import logo from "../assets/Short dark cropped.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Header component for the application.
 * It contains the logo and navigation links and search bar.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function Header() {
  return (
    <header>
      <NavLink to="/" title="Home" id="index-link">
        <img src={logo} alt="Logo for Learniverse Connect" id="logo-header" />
      </NavLink>
      <form id="header-form" action="/explore" method="get">
        <input
          id="search-bar"
          title="Type and hit search to search for courses"
          type="text"
          name="search"
          placeholder="Search for courses..."
        />
        <button type="submit" title="Search" id="search-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        {/*<!-- TODO: Remember to change this to an icon -->*/}
      </form>
      <button id="hamburger-icon">&#9776;</button>
      <button id="x-icon">&#9747;</button>
      <nav id="header-nav">
        <NavLink className="header-link" to="cart.html" title="Cart" id="cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </NavLink>
        {/*<!-- TODO: Remember to change to an icon -->*/}
        <NavLink className="header-link" to="/explore" title="Courses">
          Courses
        </NavLink>
        <NavLink className="header-link" to="compare.html">
          Compare
        </NavLink>
        <NavLink className="header-link" to="/about" title="About" id="about">
          About
        </NavLink>
        <NavLink
          className="header-link"
          to="login.html"
          title="Sign in"
          id="sign-in-btn"
        >
          Sign in
        </NavLink>
        <NavLink
          className="header-link"
          to="Signup.html"
          title="Register"
          id="register-btn"
        >
          Register
        </NavLink>
      </nav>
    </header>
  );
}
