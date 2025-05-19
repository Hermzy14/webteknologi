import "../css/about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faEnvelope,
  faPhone,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { asyncApiRequest } from "../tools/requests";

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * This is the about page.
 * It contains information about the website and its purpose.
 * It also includes a contact form for users to reach out.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function About() {
  // State to manage icon for copying text
  const [copyIcons, setCopyIcons] = useState({
    email: faCopy,
    phone: faCopy,
    address: faCopy,
  });
  // State to manage success message and clicked item
  const [successMessage, setSuccessMessage] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  // State to manage the return message after sending a message
  const [returnMessage, setReturnMessage] = useState("");

  // Function to handle copying text to clipboard
  const handleCopyText = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      // Update the icon for the clicked item
      setCopyIcons((prevIcons) => ({
        ...prevIcons,
        [type]: faCheck,
      }));

      // Set which item was clicked and the success message
      setActiveItem(type);
      setSuccessMessage(`${capitalizeFirstLetter(type)} copied to clipboard!`);

      // Reset states after animation duration
      setTimeout(() => {
        setCopyIcons((prevIcons) => ({
          ...prevIcons,
          [type]: faCopy,
        }));
        setSuccessMessage("");
        setActiveItem(null);
      }, 2000);
    });
  };

  // Function to handle form submission, should send a POST request to the server
  const sendMessage = (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      message: event.target.message.value,
    };
    // Send a POST request to the server
    try {
      asyncApiRequest("/messages", "POST", data)
        .then((response) => {
          displayResponse(response.data);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          displayResponse("Failed to send message. Please try again.");
        });
    } catch (error) {
      displayResponse("An error occurred. Please try again.");
    }
  };

  // Function to display the response from the server
  const displayResponse = (response) => {
    setReturnMessage(response);
    // Clear the message after 6 seconds
    setTimeout(() => {
      setReturnMessage("");
    }, 6000);
  };

  return (
    <main id="about-page">
      <div id="index-hero">
        <div id="hero-content-wrapper-about">
          <h1>About us!</h1>
          <p>
            Welcome to Learniverse Connect, your premier destination for
            unlocking a world of knowledge and skills through{" "}
            <NavLink to="/explore">
              our dynamic online course marketplace.
            </NavLink>
          </p>
        </div>
      </div>
      <section id="about-us">
        <p>
          At Learniverse, we believe that learning knows no bounds, and our
          platform is designed to empower individuals like you to embark on a
          journey of lifelong learning. As a marketplace, we bring together a
          diverse array of courses from passionate and expert third-party
          providers, ensuring that you have access to a comprehensive range of
          subjects and skills to fuel your personal and professional growth.
        </p>
        <br />
        <p>
          Our commitment to quality is unwavering, and we meticulously curate
          our course offerings to guarantee a premium learning experience.
          Whether you're a budding entrepreneur looking to master the
          intricacies of business strategy or someone seeking to delve into the
          realms of creative arts, Learniverse Connect is your trusted companion
          on the path to success. Join our vibrant community of learners,
          connect with top-notch instructors, and explore a rich tapestry of
          knowledge that awaits you. At Learniverse, we envision a world where
          learning is not just a destination but a continuous, enriching
          journey, and we invite you to be a part of this transformative
          experience. Embrace the future of education with Learniverse Connect -
          where knowledge meets opportunity.
        </p>
        <br />
        <p>
          At Learniverse Connect, we pride ourselves on offering courses that
          not only equip you with valuable knowledge and skills but also pave
          the way for tangible recognition through certifications. Upon
          successfully completing any course on our platform, you gain the
          opportunity to take the corresponding certification exam, validating
          your newfound expertise. We understand the importance of
          certifications in today's competitive landscape, and that's why we
          stand behind our courses with a robust money-back guarantee. If, for
          any reason, you don't pass the certification exam after diligently
          completing the course, we ensure a hassle-free refund, underscoring
          our commitment to your success and confidence in the quality of our
          educational offerings. Your journey with Learniverse is not just about
          learning; it's about achieving and celebrating your milestones with
          the assurance that your investment in education is backed by our
          unwavering support.
        </p>
        <br />
        <p>
          While our courses predominantly take place in the virtual realm, we
          take pride in providing a unique blend of online learning and
          real-time engagement. Each course is facilitated by a dedicated
          physical instructor who not only guides you through the material but
          also ensures an interactive and dynamic learning experience. To
          further enrich your educational journey, we offer workshop sessions,
          adding a hands-on dimension to the online courses. While these courses
          are organized at specific dates to accommodate the workshop sessions,
          we understand the importance of flexibility. Rest assured, our
          commitment to your convenience is paramount, and the courses are
          strategically repeated several times a year, offering ample
          opportunities for you to participate and thrive in your learning
          pursuits.
        </p>
      </section>

      {/* Contact us */}
      <section id="contact-form-section">
        <h2>Contact us</h2>
        <form onSubmit={sendMessage} id="contact-form">
          <span
            id="return-message"
            style={{ display: returnMessage ? "flex" : "none" }}
          >
            {returnMessage}
          </span>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
          />
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            required
            placeholder="Your message"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      {/* Other ways to contact */}
      <section id="other-contact-options-section">
        <h3>Other ways to contact us:</h3>
        <ul id="list-container">
          <li
            className="contact-option"
            title="Click to copy mail"
            onClick={() => handleCopyText("learniverse@connect.com", "email")}
          >
            <FontAwesomeIcon icon={faEnvelope} /> learniverse@connect.com{" "}
            <FontAwesomeIcon icon={copyIcons.email} className="copy-icon" />
            {activeItem === "email" && (
              <span className="success-message">{successMessage}</span>
            )}
          </li>

          <li
            className="contact-option"
            title="Click to copy phone number"
            onClick={() => handleCopyText("+47 40686044", "phone")}
          >
            <FontAwesomeIcon icon={faPhone} /> +47 40686044{" "}
            <FontAwesomeIcon icon={copyIcons.phone} className="copy-icon" />
            {activeItem === "phone" && (
              <span className="success-message">{successMessage}</span>
            )}
          </li>

          <li
            className="contact-option"
            title="Click to copy address"
            onClick={() => handleCopyText("Gamle Blindheimsveg 25", "address")}
          >
            <FontAwesomeIcon icon={faHouse} /> Gamle Blindheimsveg 25{" "}
            <FontAwesomeIcon icon={copyIcons.address} className="copy-icon" />
            {activeItem === "address" && (
              <span className="success-message">{successMessage}</span>
            )}
          </li>
        </ul>
      </section>
    </main>
  );
}
