import "../css/global-styles.css";
import "../css/explore.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";

/**
 * This is the Explore page component.
 * It displays a list of courses with their details.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function Explore() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ categories: [], price: 100000 });
  const [sortOption, setSortOption] = useState("price-asc");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all courses when page loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/courses"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data); // Store all courses
        setFilteredCourses(data); // Initially, show all courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main>
      {/*<!-- Side panel for filtering -->*/}
      <aside id="filter">
        <h2>Categories</h2>
        <div className="filter-group">
          <div className="filter-item">
            <input type="checkbox" id="it" />
            <div className="filter-item-details">
              <label for="it" className="filter-item-title">
                IT
              </label>
              <span className="filter-item-subtitle">
                Information Technology courses
              </span>
            </div>
          </div>

          <div className="filter-item">
            <input type="checkbox" id="marketing" />
            <div className="filter-item-details">
              <label for="marketing" className="filter-item-title">
                Digital Marketing
              </label>
              <span className="filter-item-subtitle">
                Digital Marketing courses
              </span>
            </div>
          </div>

          <div className="filter-item">
            <input type="checkbox" id="business" />
            <div className="filter-item-details">
              <label for="business" className="filter-item-title">
                B&E
              </label>
              <span className="filter-item-subtitle">
                Business and Entrepreneurship courses
              </span>
            </div>
          </div>

          <div className="filter-item">
            <input type="checkbox" id="analytics" />
            <div className="filter-item-details">
              <label for="analytics" className="filter-item-title">
                Analytics
              </label>
              <span className="filter-item-subtitle">
                Data Science and Analytics courses
              </span>
            </div>
          </div>
        </div>

        <div className="filter-group">
          <h2>Price</h2>
          <div className="price-range-header">
            <span>0 NOK</span>
            <span id="max-price">100 000 NOK</span>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            value="100000"
            className="price-slider"
            id="price-range"
          />
        </div>
      </aside>

      {/*<!-- Result text and buttons for sorting -->*/}
      <div className="main-content">
        <section id="result-and-sort">
          <p id="result-text">Search results for 'xyz...'</p>
          <nav id="sorting-options">
            <button className="sort-option active">Price ascending</button>
            <button className="sort-option">Price descending</button>
          </nav>
        </section>

        {/* Course cards
        TODO: This will be added automatically by JavaScript */}
        <section id="courses">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              return (
                <NavLink className="wrapper-tag" to="/courseinformation">
                  <div className="card">
                    <div className="image"></div>
                    <div className="course-details">
                      <h3 className="course-title">{course.title}</h3>
                      <ul>
                        {course.providers.map((provider) => (
                          <li key={provider.id}>
                            {provider.name}: {provider.price}{" "}
                            {provider.currency}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavLink>
              );
            })
          ) : (
            <div className="no-results">
              <p>No courses found</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
