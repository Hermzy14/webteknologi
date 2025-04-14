import "../css/global-styles.css";
import "../css/explore.css";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "../components/Filter";
import { useCourses } from "../components/CourseProvider";

/**
 * This is the Explore page component.
 * It displays a list of courses with their details.
 *
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function Explore({ searchTerm: externalSearchTerm }) {
  const { courses, isLoading } = useCourses();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortOption, setSortOption] = useState("price-asc");

  // Get search from URL query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlSearchTerm = queryParams.get("search") || "";
  // Get category from URL query params
  const categoryFromQuery = queryParams.get("category");

  // Use external search term if provided, otherwise use URL search term
  const [searchTerm, setSearchTerm] = useState(
    externalSearchTerm || urlSearchTerm
  );

  // Update search term when external search term changes
  useEffect(() => {
    if (externalSearchTerm !== undefined) {
      setSearchTerm(externalSearchTerm);
    }
  }, [externalSearchTerm]);

  // Update search term when URL search term changes
  useEffect(() => {
    if (urlSearchTerm && !externalSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [urlSearchTerm, externalSearchTerm]);

  //Apply category filter from URL if present
  useEffect(() => {
    if (categoryFromQuery) {
      setActiveCategories([categoryFromQuery]);
    }
  }, [categoryFromQuery]);

  // Apply filters, searching, and sorting
  useEffect(() => {
    if (courses.length === 0) return;

    let result = [...courses];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          (course.keywords && course.keywords.toLowerCase().includes(term))
      );
    }

    // Apply category filters
    if (activeCategories.length > 0) {
      result = result.filter((course) =>
        activeCategories.includes(course.category.name)
      );
    }

    // Apply price filter
    result = result.filter((course) => {
      // Find the lowest price among providers
      const lowestPrice = Math.min(...course.providers.map((p) => p.price));
      return lowestPrice <= maxPrice;
    });

    // Apply sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => {
        const aPrice = Math.min(...a.providers.map((p) => p.price));
        const bPrice = Math.min(...b.providers.map((p) => p.price));
        return aPrice - bPrice;
      });
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => {
        const aPrice = Math.min(...a.providers.map((p) => p.price));
        const bPrice = Math.min(...b.providers.map((p) => p.price));
        return bPrice - aPrice;
      });
    }

    setFilteredCourses(result);
  }, [courses, searchTerm, activeCategories, maxPrice, sortOption]);

  // Toggle category filter
  const handleCategoryToggle = (category) => {
    setActiveCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Handle price slider change
  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
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

  // Handle filter toggle for mobile view
  const handleFilterToggle = () => {
    const filterElement = document.getElementById("mobile-filter");
    if (filterElement) {
      filterElement.classList.toggle("active");
    }
  };

  return (
    <main>
      {/* Side panel for filtering */}
      <Filter
        id="desktop-filter"
        activeCategories={activeCategories}
        handleCategoryToggle={handleCategoryToggle}
        maxPrice={maxPrice}
        handlePriceChange={handlePriceChange}
      />

      {/* Result text and buttons for sorting */}
      <div className="main-content">
        <section id="result-and-sort">
          <div className="mobile-filter-result-wrapper">
            <button id="filter-button" onClick={handleFilterToggle}>
              <FontAwesomeIcon icon={faSliders} />
            </button>
            {searchTerm ? (
              <p id="result-text">Search results for '{searchTerm}'</p>
            ) : (
              <p id="result-text">All courses ({filteredCourses.length})</p>
            )}
          </div>

          {/* Mobile filter - hidden by default, toggles visibility */}
          <Filter
            id="mobile-filter"
            activeCategories={activeCategories}
            handleCategoryToggle={handleCategoryToggle}
            maxPrice={maxPrice}
            handlePriceChange={handlePriceChange}
          />

          <nav id="sorting-options">
            <button
              className={`sort-option ${
                sortOption === "price-asc" ? "active" : ""
              }`}
              onClick={() => handleSortChange("price-asc")}
            >
              Price ascending
            </button>
            <button
              className={`sort-option ${
                sortOption === "price-desc" ? "active" : ""
              }`}
              onClick={() => handleSortChange("price-desc")}
            >
              Price descending
            </button>
          </nav>
        </section>

        {/* Course cards */}
        <section id="courses">
          {isLoading ? (
            <div className="loading">Loading courses...</div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <NavLink
                className="wrapper-tag"
                to={`/courseinformation/${course.id}`}
                key={course.id}
              >
                <div className="card">
                  <div className="image"></div>
                  <div className="course-details">
                    <h3 className="course-title">{course.title}</h3>
                    <ul>
                      {course.providers.map((provider) => (
                        <li key={provider.id}>
                          {provider.name}:{" "}
                          {/* Format price with discount if applicable */}
                          {provider.discount > 0
                            ? formatPrice(
                                provider.price * (1 - provider.discount / 100),
                                provider.currency
                              )
                            : formatPrice(provider.price, provider.currency)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            <div className="no-results">
              <p>No courses found matching your criteria</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
