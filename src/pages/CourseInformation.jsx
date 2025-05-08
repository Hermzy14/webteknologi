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
      

      {/* Main content */}
      <main id="courseInformationMain">
        <section className="informationPanel">
          <section className="informationPanel3">
            <h2>Real time programming in Java</h2>

            <div className="imageWrapper">
              <img
                src="src/assets/Image-not-found.png"
                className="imgNotFound2"
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
                src="src/assets/leftArrow.PNG"
                className="leftArrow"
                alt="leftArrow"
              />
            </NavLink>

            <section className="carouselCard">
              <NavLink to="">
                <img
                  src="src/assets/Image-not-found.png"
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
                  src="src/assets/Image-not-found.png"
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
                  src="src/assets/Image-not-found.png"
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
                  src="src/assets/Image-not-found.png"
                  alt="Course thumbnail"
                />
                <p className="courseText"> programming in java</p>
                <p className="priceText"> 25 000 NOK</p>
                <p className="providerText"> NTNU</p>
              </NavLink>
            </section>

            <NavLink to="" className="rightArrow" title="right">
              <img
                src="src/assets/rightArrow.PNG"
                className="rightArrow"
                alt="rightArrow"
              />
            </NavLink>
          </section>

          {/* TODO: Add functionallity for the buttons, to browse between displayed courses */}
        </section>
      </main>

     
    </div>
  );
}