import "../css/global-styles.css";
import "../css/LandingPage.css";
import "../css/card.css";
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { useCourses } from "../components/CourseProvider";
import { useCart } from "../components/CartContext";
import { CourseCard } from "../components/CourseCard";
import { useCompare } from "../components/CompareContext";

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
  const { discountedCourses, isLoading, courses } = useCourses();
  const { addToCart } = useCart();
  const { addToCompare } = useCompare();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedCourseId, setAddedCourseId] = useState(null);
  const [addedCourseAction, setAddedCourseAction] = useState(null);

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

  // Handle adding course to cart
  const handleAddToCart = (course, provider) => {
    try {
      addToCart(course, provider);
      setAddedCourseId(course.id); // Set the ID of the added course
      setAddedCourseAction("cart"); // Set the action type

      // Clear both state variables after 3 seconds
      setTimeout(() => {
        setAddedCourseId(null);
        setAddedCourseAction(null);
      }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Handle adding course to compare
  const handleAddToCompare = (course, provider) => {
    try {
      addToCompare(course, provider);
      setAddedCourseId(course.id); // Set the ID of the added course
      setAddedCourseAction("compare"); // Set the action type

      // Clear both state variables after 3 seconds
      setTimeout(() => {
        setAddedCourseId(null);
        setAddedCourseAction(null);
      }, 3000);
    } catch (error) {
      console.error("Error adding to compare:", error);
    }
  };

  // Load all course images to be displayed in the carousel
  const loadCourseImages = (category) => {
    const courseImages = [];
    courses.forEach((course) => {
      if (course.imagePath && course.category.name === category) {
        courseImages.push(course.imagePath);
      }
    });
    // Limit to 4 images for the grid
    return courseImages.slice(0, 4);
  };

  return (
    <main id="index-main">
      {/* Hero section */}
      <div id="index-hero">
        <div className="hero-content-wrapper">
          <h1>Welcome to Learniverse Connect!</h1>
          <p>
            Your one-stop destination for online courses and learning
            opportunities. <NavLink to={"/explore"}>Explore</NavLink> a wide
            range of courses from top providers and enhance your skills today!
          </p>
        </div>
      </div>

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
              <div className="carousel-image-wrapper">
                {/* Load course images for the carousel */}
                {loadCourseImages(category).map((imagePath, idx) => (
                  <img
                    key={idx}
                    src={`/course-images/${imagePath}`}
                    alt={`Course image ${idx + 1}`}
                    className="carousel-image"
                  />
                ))}
              </div>
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

        {/* Navigation dots */}
        <div className="carousel-dots">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
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
          <label htmlFor="filter-select" className="mobile-filter-label">
            Filter by category:
          </label>
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
          {isLoading ? (
            <p>Loading courses...</p>
          ) : getFilteredCourses().length > 0 ? (
            getFilteredCourses().map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                formatPrice={formatPrice}
                onAddToCart={handleAddToCart}
                onAddToCompare={handleAddToCompare}
                addedItemId={addedCourseId}
                selectedProviderIndex={0}
                addedItemAction={addedCourseAction}
              />
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
