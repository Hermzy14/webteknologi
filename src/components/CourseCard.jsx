import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../css/card.css";

/**
 * Reusable course card component for displaying course information.
 *
 * @param {Object} props - Component props
 * @param {Object} props.course - Course data
 * @param {Function} props.formatPrice - Function to format price
 * @param {Function} props.onAddToCart - Function to handle adding to cart
 * @param {Function} props.onAddToCompare - Function to handle adding to compare
 * @param {Function} props.onProviderChange - Function to handle provider change
 * @param {number} props.selectedProviderIndex - Index of selected provider
 * @param {boolean} props.showCompare - Whether to show compare button
 * @param {number|null} props.addedItemId - ID of recently added item (for success message)
 * @param {string|null} props.addedItemAction - Action type of recently added item (for success message)
 * @returns {JSX.Element} The rendered component
 */
export function CourseCard({
  course,
  formatPrice,
  onAddToCart,
  onAddToCompare,
  onProviderChange,
  selectedProviderIndex = 0,
  showCompare = true,
  addedItemId = null,
  addedItemAction = null, // Add this new prop to track the action type
}) {
  // Support both course structures from Explore and LandingPage
  const isDiscountedCourse = course.discountedPrice !== undefined;

  // Handle different data structures
  const providers = course.providers || [];
  const selectedProvider = isDiscountedCourse
    ? {
        name: course.provider,
        price: course.originalPrice,
        discount: course.discount,
        currency: course.currency,
      }
    : providers[selectedProviderIndex] || {};

  const imagePath = course.imagePath || "default-image.jpg";
  const courseId = isDiscountedCourse ? course.courseId : course.id;

  return (
    <div className="card">
      <NavLink className="wrapper-tag" to={`/courseinformation/${courseId}`}>
        <div className="image-container">
          <img
            src={`/course-images/${imagePath}`}
            alt={course.title}
            className="course-image"
          />
        </div>
        <div className="course-details">
          <h3 className="course-title">{course.title}</h3>

          {isDiscountedCourse && (
            <>
              <p className="discounted-price">
                {formatPrice(course.discountedPrice, course.currency)}
              </p>
              <p className="course-price">
                {formatPrice(course.originalPrice, course.currency)}
              </p>
              <p className="provider">{course.provider}</p>
            </>
          )}
        </div>
      </NavLink>

      {!isDiscountedCourse && providers.length > 0 && (
        <select
          className="provider-select"
          value={selectedProviderIndex}
          onChange={(e) =>
            onProviderChange(course.id, parseInt(e.target.value))
          }
        >
          {providers.map((provider, index) => (
            <option key={provider.id} value={index}>
              {provider.name}:{" "}
              {provider.discount > 0
                ? formatPrice(
                    provider.price * (1 - provider.discount / 100),
                    provider.currency
                  )
                : formatPrice(provider.price, provider.currency)}
            </option>
          ))}
        </select>
      )}

      {showCompare && (
        <button
          className="add-to-compare-button"
          onClick={() => onAddToCompare(course, selectedProvider)}
        >
          Add to compare
        </button>
      )}

      <button
        className="add-to-cart-button"
        onClick={() => onAddToCart(course, selectedProvider)}
      >
        Add to cart
      </button>

      {/* Modified success message with conditional text */}
      {addedItemId === (isDiscountedCourse ? course.id : course.id) && (
        <div className="cart-success-message">
          {addedItemAction === "compare"
            ? "Added to compare!"
            : "Added to cart!"}
        </div>
      )}
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  formatPrice: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onAddToCompare: PropTypes.func,
  onProviderChange: PropTypes.func,
  selectedProviderIndex: PropTypes.number,
  showCompare: PropTypes.bool,
  addedItemId: PropTypes.number,
  addedItemAction: PropTypes.string, // Add this new prop type
};
