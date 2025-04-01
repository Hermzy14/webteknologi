import "../css/global-styles.css";
import "../css/explore.css";

/**
 * This is the Explore page component.
 * It displays a list of courses with their details.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function Explore() {
  return (
    <main>
      {/*<!-- Side panel for filtering -->*/}
      <aside id="filter">
        <h2>Categories</h2>
        <div class="filter-group">
          <div class="filter-item">
            <input type="checkbox" id="it" />
            <div class="filter-item-details">
              <label for="it" class="filter-item-title">
                IT
              </label>
              <span class="filter-item-subtitle">
                Information Technology courses
              </span>
            </div>
          </div>

          <div class="filter-item">
            <input type="checkbox" id="marketing" />
            <div class="filter-item-details">
              <label for="marketing" class="filter-item-title">
                Digital Marketing
              </label>
              <span class="filter-item-subtitle">
                Digital Marketing courses
              </span>
            </div>
          </div>

          <div class="filter-item">
            <input type="checkbox" id="business" />
            <div class="filter-item-details">
              <label for="business" class="filter-item-title">
                B&E
              </label>
              <span class="filter-item-subtitle">
                Business and Entrepreneurship courses
              </span>
            </div>
          </div>

          <div class="filter-item">
            <input type="checkbox" id="analytics" />
            <div class="filter-item-details">
              <label for="analytics" class="filter-item-title">
                Analytics
              </label>
              <span class="filter-item-subtitle">
                Data Science and Analytics courses
              </span>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <h2>Price</h2>
          <div class="price-range-header">
            <span>0 NOK</span>
            <span id="max-price">100 000 NOK</span>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            value="100000"
            class="price-slider"
            id="price-range"
          />
        </div>
      </aside>

      {/*<!-- Result text and buttons for sorting -->*/}
      <div class="main-content">
        <section id="result-and-sort">
          <p id="result-text">Search results for 'xyz...'</p>
          <nav id="sorting-options">
            <button class="sort-option active">Price ascending</button>
            <button class="sort-option">Price descending</button>
          </nav>
        </section>

        {/* Course cards
        TODO: This will be added automatically by JavaScript */}
        <a class="wrapper-tag" href="courseinformation.html">
          <div class="card">
            <div class="image"></div>
            <div class="course-details">
              <h3 class="course-title">Programming in Java</h3>
              <p class="course-price">25 000 NOK</p>
              <p class="provider">NTNU</p>
            </div>
          </div>
        </a>
      </div>
    </main>
  );
}
