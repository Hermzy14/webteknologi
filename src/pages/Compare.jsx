import React from "react";
import "../css/global-styles.css";
import "../css/compare.css";
import { useCompare } from "../components/CompareContext";
import { useCart } from "../components/CartContext";
import { NavLink } from "react-router-dom";

function ComparePage() {
  const { compareItems, removeFromCompare } = useCompare();
  const { addToCart } = useCart();

  const handleAddToCart = (course) => {
    addToCart(course, course.providers?.[0]); // Adjust provider logic as needed
  };

  return (
    <main className="compare-page">
      <h1 className="compare-heading">Compare courses</h1>

      {compareItems.length === 0 ? (
        <div className="compare-empty">
          <p>You have no courses to compare.</p>
          <NavLink to="/explore" className="compare-button">
            Browse Courses
          </NavLink>
        </div>
      ) : (
        <div className="compare-courses-wrapper">
          {compareItems.length === 1 ? (
            <>
              <div className="compare-course-card">
                <CompareCard
                  course={compareItems[0]}
                  onRemove={() => removeFromCompare(compareItems[0].id)}
                  onAddToCart={() => handleAddToCart(compareItems[0])}
                />
              </div>
              <div className="compare-placeholder-card">
                <p>Select another course to compare.</p>
                <NavLink to="/explore" className="compare-button">
                  Find Another Course
                </NavLink>
              </div>
            </>
          ) : (
            compareItems.slice(0, 2).map((course) => (
              <div key={course.id} className="compare-course-card">
                <CompareCard
                  course={course}
                  onRemove={() => removeFromCompare(course.id)}
                  onAddToCart={() => handleAddToCart(course)}
                />
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

function CompareCard({ course, onRemove, onAddToCart }) {
  return (
    <section className="compare-card">
      <h2 className="course-title">{course.title}</h2>
      <div className="compare-top">
        <div className="compare-img-wrapper">
          <img
            src={
              course.imagePath
                ? `/course-images/${course.imagePath}`
                : "resources/Image-not-found.png"
            }
            alt={course.title}
            className="compare-img"
          />
        </div>
        <div className="compare-text-buttons">
          <p className="compare-price">
            {course.providers[0]?.price?.toLocaleString()} NOK
          </p>
          <p>{course.startDate || "Date TBD"}</p>
          <p>{course.hoursPerWeek || "Hours TBD"}</p>
          <p>{course.providers[0]?.name || "Provider TBD"}</p>
          <div className="compare-button-group">
            <button onClick={onRemove}>Remove</button>
            <button onClick={onAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
      <p className="compare-description">{course.description}</p>
    </section>
  );
}

export default ComparePage;
