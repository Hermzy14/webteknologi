import React from "react";
import "../css/explore.css";

/**
 * Filter component for the Explore page.
 *
 * @param {string} id - The id of the filter component.
 * @param {Array} activeCategories - The currently active categories.
 * @param {function} handleCategoryToggle - Function to handle category toggle.
 * @param {number} maxPrice - The maximum price selected.
 * @param {function} handlePriceChange - Function to handle price change.
 * @returns {JSX.Element} The Filter component.
 */
export function Filter({
  id,
  activeCategories,
  handleCategoryToggle,
  maxPrice,
  handlePriceChange,
}) {
  return (
    <aside id={id} className="filter">
      <h2>Categories</h2>
      <div className="filter-group">
        <div className="filter-item">
          <input
            type="checkbox"
            id={`${id}-it`}
            checked={activeCategories.includes("Information Technologies")}
            onChange={() => handleCategoryToggle("Information Technologies")}
          />
          <div className="filter-item-details">
            <label htmlFor={`${id}-it`} className="filter-item-title">
              IT
            </label>
            <span className="filter-item-subtitle">
              Information Technology courses
            </span>
          </div>
        </div>

        <div className="filter-item">
          <input
            type="checkbox"
            id={`${id}-marketing`}
            checked={activeCategories.includes("Digital Marketing")}
            onChange={() => handleCategoryToggle("Digital Marketing")}
          />
          <div className="filter-item-details">
            <label htmlFor={`${id}-marketing`} className="filter-item-title">
              Digital Marketing
            </label>
            <span className="filter-item-subtitle">
              Digital Marketing courses
            </span>
          </div>
        </div>

        <div className="filter-item">
          <input
            type="checkbox"
            id={`${id}-business`}
            checked={activeCategories.includes("Business and Entrepreneurship")}
            onChange={() =>
              handleCategoryToggle("Business and Entrepreneurship")
            }
          />
          <div className="filter-item-details">
            <label htmlFor={`${id}-business`} className="filter-item-title">
              B&E
            </label>
            <span className="filter-item-subtitle">
              Business and Entrepreneurship courses
            </span>
          </div>
        </div>

        <div className="filter-item">
          <input
            type="checkbox"
            id={`${id}-analytics`}
            checked={activeCategories.includes("Data Science and Analytics")}
            onChange={() => handleCategoryToggle("Data Science and Analytics")}
          />
          <div className="filter-item-details">
            <label htmlFor={`${id}-analytics`} className="filter-item-title">
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
          <span>0 USD</span>
          <span id={`${id}-max-price`}>{maxPrice.toLocaleString()} USD</span>
        </div>
        <label htmlFor={`${id}-price-range`} className="price-slider-label">
          Select max price:
        </label>
        <input
          type="range"
          min="0"
          max="10000"
          value={maxPrice}
          className="price-slider"
          id={`${id}-price-range`}
          onChange={handlePriceChange}
        />
      </div>
    </aside>
  );
}
