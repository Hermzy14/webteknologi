import { NavLink } from "react-router-dom";
import "../css/global-styles.css";
import logo from "../assets/Long white cropped.png";

/**
 * Footer component.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <img id="logo-footer" src={logo} alt="Logo of Learniverse Connect" />
        <div className="inner-wrapper">
          <p className="footer-text">
            This website is a result of a university group project, performed in
            the course IDATA2301 Web technologies, at NTNU. <br />
            All the information provided here is a result of imagination. Any
            resemblance with real companies or products is a coincidence.
          </p>
          <p className="footer-text">&copy; 2025 Learniverse Connect</p>
          <NavLink to="about.html" id="contact-link">
            Contact us
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
