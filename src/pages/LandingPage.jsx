import "../css/global-styles.css";
import "../css/index.css";
import "../css/card.css";
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { asyncApiRequest } from "../tools/requests";

/**
 * Component representing the landing page of the application.
 * It contains a carousel section and a discounted courses section.
 * The carousel displays a promotional message and a button to explore courses.
 * The discounted courses section displays a list of discounted courses
 * with their details, including title, price, and provider.
 * The section also includes a filter navigation to filter courses by category.
 * The filter options are available as buttons and a select menu for mobile devices.
 * The discounted courses are displayed in a card format with an image,
 * title, price, and provider information.
 * @returns {JSX.Element} The rendered component.
 * @constructor
 */
function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [discountedCourses, setDiscountedCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Load courses from the backend.
   */
  async function loadCourses() {
    try {
      const c = await asyncApiRequest("/courses", "GET", null);
      setCourses(c);
      const discounted = processCoursesWithDiscounts(c);
      setDiscountedCourses(discounted);
      console.log("Courses loaded successfully");
    } catch (error) {
      onCoursesLoadError(error);
    }
  }

  /**
   * Handle error when loading courses.
   */
  function onCoursesLoadError(error) {
    console.error("Error loading courses:", error);
  }

  // Fetch courses when the component mounts
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses();
    } else {
      console.log("Courses already loaded");
    }
  }, []);

  // Process courses to extract only those with discounts and format them for display
  const processCoursesWithDiscounts = (coursesData) => {
    const discounted = [];

    coursesData.forEach((course) => {
      // Check each provider for the course
      course.providers.forEach((provider) => {
        // Only include providers offering a discount
        if (provider.discount > 0) {
          const originalPrice = provider.price;
          const discountedPrice = originalPrice * (1 - provider.discount / 100);

          discounted.push({
            id: `${course.id}-${provider.id}`,
            courseId: course.id,
            title: course.title,
            originalPrice: originalPrice,
            discountedPrice: discountedPrice,
            provider: provider.name,
            currency: provider.currency,
            category: course.category.name,
            discount: provider.discount,
          });
        }
      });
    });

    return discounted;
  };

  // Filter courses by category
  const filterCoursesByCategory = (category) => {
    setActiveCategory(category);
  };

  // Get filtered courses based on active category
  const getFilteredCourses = () => {
    if (activeCategory === "all") {
      return discountedCourses;
    }
    return discountedCourses.filter(
      (course) => course.category === activeCategory
    );
  };

  // Handle filter button click
  const handleFilterClick = (category) => {
    filterCoursesByCategory(category);
  };

  // Handle mobile filter select change
  const handleFilterSelectChange = (e) => {
    const categoryMap = {
      all: "all",
      it: "Information Technologies",
      dm: "Digital Marketing",
      be: "Business and Entrepreneurship",
      dsa: "Data Science and Analytics",
    };
    filterCoursesByCategory(categoryMap[e.target.value]);
  };

  // Format price with appropriate currency
  const formatPrice = (price, currency) => {
    if (currency === "NOK") {
      return `${Math.round(price).toLocaleString()} NOK`;
    } else if (currency === "USD") {
      return `$${price.toLocaleString()}`;
    }
    return `${price} ${currency}`;
  };

  // Categories for the carousel
  const categories = [
    "Information Technologies",
    "Digital Marketing",
    "Business and Entrepreneurship",
    "Data Science and Analytics",
  ];

  // Navigate to the next slide
  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === categories.length - 1 ? 0 : prevSlide + 1
    );
  };

  // Navigate to the previous slide
  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? categories.length - 1 : prevSlide - 1
    );
  };

  return (
    <main id="index-main">
      {/* Carousel section */}
      <section id="carousel">
        <button
          className="nav-button prev-button"
          onClick={handlePrevSlide}
          title="Previous slide"
        >
          &#8592;
        </button>
        <button
          className="nav-button next-button"
          onClick={handleNextSlide}
          title="Next slide"
        >
          &#8594;
        </button>
        <div id="carousel-container">
          {categories.map((category, index) => (
            <div
              className={`carousel-slide ${
                index === currentSlide ? "active" : "inactive"
              }`}
              data-index={index}
              key={category}
            >
              <div className="carousel-image"></div>
              <div id="carousel-content">
                <h2>Looking for courses on {category}?</h2>
                <p>
                  We have multiple courses within this field from multiple
                  providers!
                </p>
                <NavLink
                  to={`/explore?category=${encodeURIComponent(category)}`}
                  className="explore-btn"
                  title={`Explore ${category} courses"`}
                >
                  Explore!
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discounted courses section */}
      <section id="discounted">
        <div className="navigation-title-wrapper">
          <h2 id="discounted-title">Discounted courses</h2>
          <nav id="filter-nav">
            <button
              className={`filter-button ${
                activeCategory === "all" ? "active" : ""
              }`}
              title="Displays discounted courses from all categories"
              onClick={() => handleFilterClick("all")}
            >
              All categories
            </button>
            <button
              className={`filter-button ${
                activeCategory === "Information Technologies" ? "active" : ""
              }`}
              title="Displays discounted courses on Information Technologies"
              onClick={() => handleFilterClick("Information Technologies")}
            >
              Information Technologies
            </button>
            <button
              className={`filter-button ${
                activeCategory === "Digital Marketing" ? "active" : ""
              }`}
              title="Displays discounted courses on Digital Marketing"
              onClick={() => handleFilterClick("Digital Marketing")}
            >
              Digital Marketing
            </button>
            <button
              className={`filter-button ${
                activeCategory === "Business and Entrepreneurship"
                  ? "active"
                  : ""
              }`}
              title="Displays discounted courses on Business and Entrepreneurship"
              onClick={() => handleFilterClick("Business and Entrepreneurship")}
            >
              Business and Entrepreneurship
            </button>
            <button
              className={`filter-button ${
                activeCategory === "Data Science and Analytics" ? "active" : ""
              }`}
              title="Displays discounted courses on Data Science and Analytics"
              onClick={() => handleFilterClick("Data Science and Analytics")}
            >
              Data Science and Analytics
            </button>
          </nav>

          {/* Mobile select menu */}
          <select
            id="filter-select"
            onChange={handleFilterSelectChange}
            value={
              activeCategory === "all"
                ? "all"
                : activeCategory === "Information Technologies"
                ? "it"
                : activeCategory === "Digital Marketing"
                ? "dm"
                : activeCategory === "Business and Entrepreneurship"
                ? "be"
                : activeCategory === "Data Science and Analytics"
                ? "dsa"
                : "all"
            }
          >
            <option value="all">All categories</option>
            <option value="it">Information Technologies</option>
            <option value="dm">Digital Marketing</option>
            <option value="be">Business and Entrepreneurship</option>
            <option value="dsa">Data Science and Analytics</option>
          </select>
        </div>

        {/* Discounted courses cards */}
        <div className="card-wrapper">
          {getFilteredCourses().length > 0 ? (
            getFilteredCourses().map((course) => (
              <NavLink
                className="wrapper-tag"
                to={`/courseinformation/${course.courseId}`}
                key={course.id}
              >
                <div className="card">
                  <div className="image"></div>
                  <div className="course-details">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="discounted-price">
                      {formatPrice(course.discountedPrice, course.currency)}
                    </p>
                    <p className="course-price">
                      {formatPrice(course.originalPrice, course.currency)}
                    </p>
                    <p className="provider">{course.provider}</p>
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            <p className="no-courses-message">
              No discounted courses available in this category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
