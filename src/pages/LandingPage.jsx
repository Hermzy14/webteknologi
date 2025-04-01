import "../css/global-styles.css";
import "../css/index.css";
import "../css/card.css";
import { NavLink } from "react-router";

function LandingPage() {
  return (
    <main id="index-main">
      {/* Carousel section */}
      <section id="carousel">
        <button className="nav-button prev-button">&#8592;</button>
        <button className="nav-button next-button">&#8594;</button>
        <div id="carousel-container">
          <div className="carousel-slide" data-index="0">
            <div className="carousel-image"></div>
            <div id="carousel-content">
              <h2>Looking for courses on Information Technologies?</h2>
              <p>
                We have multiple courses within this field from multiple
                providers!
              </p>
              <NavLink
                to="/explore"
                className="explore-btn"
                title="Explore Information Technology courses"
              >
                Explore!
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Discounted courses section */}
      <section id="discounted">
        <h2>Discounted courses</h2>
        <nav id="filter-nav">
          <button
            className="filter-button active"
            title="Displays discounted courses from all categories"
          >
            All categories
          </button>
          <button
            className="filter-button"
            title="Displays discounted courses on Information Technologies"
          >
            Information Technologies
          </button>
          <button
            className="filter-button"
            title="Displays discounted courses on Digital Marketing"
          >
            Digital Marketing
          </button>
          <button
            className="filter-button"
            title="Displays discounted courses on Business and Entrepreneurship"
          >
            Business and Entrepreneurship
          </button>
          <button
            className="filter-button"
            title="Displays discounted courses on Data Science and Analytics"
          >
            Data Science and Analytics
          </button>
        </nav>

        {/* Mobile select menu */}
        <select id="filter-select">
          <option value="all">All categories</option>
          <option value="it">Information Technologies</option>
          <option value="dm">Digital Marketing</option>
          <option value="be">Business and Entrepreneurship</option>
          <option value="dsa">Data Science and Analytics</option>
        </select>

        {/* TODO: La JavaScript her genere 'kortene' til alle de coursene som er på tilbud */}
        <div className="card-wrapper">
          <a className="wrapper-tag" href="courseinformation.html">
            <div className="card">
              <div className="image"></div>
              <div className="course-details">
                <h3 className="course-title">Programming in Java</h3>
                <p className="course-price">25 000 NOK</p>
                <p className="discounted-price">29 999 NOK</p>
                <p className="provider">NTNU</p>
              </div>
            </div>
          </a>

          <a className="wrapper-tag" href="courseinformation.html">
            <div className="card">
              <div className="image"></div>
              <div className="course-details">
                <h3 className="course-title">Programming in Java</h3>
                <p className="course-price">25 000 NOK</p>
                <p className="discounted-price">29 999 NOK</p>
                <p className="provider">NTNU</p>
              </div>
            </div>
          </a>

          <a className="wrapper-tag" href="courseinformation.html">
            <div className="card">
              <div className="image"></div>
              <div className="course-details">
                <h3 className="course-title">Programming in Java</h3>
                <p className="course-price">25 000 NOK</p>
                <p className="discounted-price">29 999 NOK</p>
                <p className="provider">NTNU</p>
              </div>
            </div>
          </a>

          <a className="wrapper-tag" href="courseinformation.html">
            <div className="card">
              <div className="image"></div>
              <div className="course-details">
                <h3 className="course-title">Programming in Java</h3>
                <p className="course-price">25 000 NOK</p>
                <p className="discounted-price">29 999 NOK</p>
                <p className="provider">NTNU</p>
              </div>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
