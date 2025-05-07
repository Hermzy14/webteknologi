import "../css/courseinformation.css";
import "../css/global-styles.css";
import { NavLink } from "react-router-dom";

/**
 * This is the course information page.
 * It displays detailed information about a specific course.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function CourseInformation() {
  return (
    <div className="flex-container">
      {/* Header */}
      <header>
        <NavLink to="/" title="Home">
          <h1>Logo</h1>
        </NavLink>
        <form action="/search" method="get" id="searchbar">
          <input
            title="Type and hit search to search for courses"
            type="text"
            name="search"
            placeholder="Search for courses..."
          />
          <button type="submit" title="Search">
            Search
          </button>
          {/* TODO: Remember to change this to an icon */}
        </form>
        <nav>
          <NavLink to="/cart" title="Cart">
            Cart
          </NavLink>
          {/* TODO: Remember to change to an icon */}
          <NavLink to="/explore" title="Courses">
            Courses
          </NavLink>
          <NavLink to="/compare">Compare</NavLink>
          <NavLink to="/about" title="About" id="about">
            About
          </NavLink>
          <NavLink to="/login" title="Sign in" id="sign-in-btn">
            Sign in
          </NavLink>
          <NavLink to="/signup" title="Register" id="register-btn">
            Register
          </NavLink>
        </nav>
      </header>

      {/* Main content */}
      <main>
        <section className="informationPanel">
          <section className="informationPanel3">
            <h2>Real time programming in Java</h2>

            <div className="imageWrapper">
              <img
                src="/rescources/Image-not-found.png"
                className="imgNotFound"
                alt="Course"
              />
            </div>

            <p className="boldText">29 999 - 32 000 nok</p>
            <p className="boldText">June 3rd - june 28th</p>
            <p className="boldText">40 hours per week</p>
            <p className="smallInfoText">
              Available courses from NTNU and Oracle
            </p>
          </section>

          <section className="informationPanel2">
            <h2>Course information</h2>

            <p>
              Embark on a transformative learning experience with our
              expert-level online course, "RealTime Programming in Java."
              Designed for seasoned developers and Java enthusiasts seeking
              mastery in real-time applications, this advanced course delves
              deep into the intricacies of leveraging Java for mission-critical
              systems. Explore cutting-edge concepts such as multithreading,
              synchronization, and low-latency programming, equipping you with
              the kills needed to build responsive and robust real-time
              solutions. ed by industry experts with extensive hands-on
              experience, this course combines theoretical insights with
              practical application, nsuring you not only grasp the theoretical
              underpinnings but also gain the proficiency to implement real-time
              solutions confidently. Elevate your Java programming expertise to
              new heights and stay ahead in the ever-evolving landscape of
              real-time systems with our comprehensive and immersive course.
            </p>

            <NavLink to="/compare">
              <button type="button" className="compareButton">
                Compare to other courses
              </button>
            </NavLink>

            <NavLink to="">
              <button type="button" className="addToCartButton">
                Add to cart
              </button>
            </NavLink>
          </section>
        </section>

        <section className="courseCarouselParent">
          <h2> Similar courses </h2>
          <section className="courseCarousel">
            <NavLink to="" className="leftArrow" title="left">
              <img
                src="/rescources/leftArrow.PNG"
                className="leftArrow"
                alt="leftArrow"
              />
            </NavLink>

            <section className="carouselCard">
              <NavLink to="">
                <img
                  src="/rescources/Image-not-found.png"
                  alt="Course thumbnail"
                />
                <p className="courseText"> programming in java</p>
                <p className="priceText"> 25 000 NOK</p>
                <p className="providerText"> NTNU</p>
              </NavLink>
            </section>

            <section className="carouselCard">
              <NavLink to="">
                <img
                  src="/rescources/Image-not-found.png"
                  alt="Course thumbnail"
                />
                <p className="courseText"> programming in java</p>
                <p className="priceText"> 25 000 NOK</p>
                <p className="providerText"> NTNU</p>
              </NavLink>
            </section>

            <section className="carouselCard">
              <NavLink to="">
                <img
                  src="/rescources/Image-not-found.png"
                  alt="Course thumbnail"
                />
                <p className="courseText"> programming in java</p>
                <p className="priceText"> 25 000 NOK</p>
                <p className="providerText"> NTNU</p>
              </NavLink>
            </section>

            <section className="carouselCard">
              <NavLink to="">
                <img
                  src="/rescources/Image-not-found.png"
                  alt="Course thumbnail"
                />
                <p className="courseText"> programming in java</p>
                <p className="priceText"> 25 000 NOK</p>
                <p className="providerText"> NTNU</p>
              </NavLink>
            </section>

            <NavLink to="" className="rightArrow" title="right">
              <img
                src="/rescources/rightArrow.PNG"
                className="rightArrow"
                alt="rightArrow"
              />
            </NavLink>
          </section>

          {/* TODO: Add functionallity for the buttons, to browse between displayed courses */}
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="flex-footer">
          {/* TODO: Remember to change this to an icon */}
          <h1>LOGO</h1>
          <p>
            This website is a result of a university group project, performed in
            the course IDATA2301 Web technologies, at NTNU. <br />
            All the information provided here is a result of imagination. Any
            resemblance with real companies or products is a coincidence.
          </p>
          <p>&copy; 2025 Learniverse Connect</p>
        </div>
      </footer>
    </div>
  );
}